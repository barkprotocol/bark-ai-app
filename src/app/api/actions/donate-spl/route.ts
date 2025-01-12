import {
    ActionPostResponse,
    createPostResponse,
    ActionGetResponse,
    ActionPostRequest,
    createActionHeaders,
  } from '@solana/actions';
  import {
    clusterApiUrl,
    Connection,
    PublicKey,
    Transaction,
  } from '@solana/web3.js';
  import * as splToken from '@solana/spl-token';
  
  const SOLANA_MAINNET_USDC_PUBKEY =
    'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';
  
  const headers = createActionHeaders();
  
  export const GET = async (req: Request) => {
    try {
      const requestUrl = new URL(req.url);
      const { toPubkey } = validatedQueryParams(requestUrl);
  
      const baseHref = new URL(
        `/api/actions/donate-spl?to=${toPubkey.toBase58()}`,
        requestUrl.origin,
      ).toString();
  
      const payload: ActionGetResponse = {
        type: 'action',
        title: 'Donate USDC to BARK',
        icon: 'https://ucarecdn.com/85f54eac-fda3-4d53-82d1-074a934483ff/donation_usdc.png',
        description:
          'Cybersecurity Enthusiast | Support my research with a donation.',
        label: 'Donate',
        links: {
          actions: [
            {
              type: 'transaction',
              label: 'Send 10 USDC',
              href: `${baseHref}&amount=${'10'}`,
            },
            {
              type: 'transaction',
              label: 'Send 50 USDC',
              href: `${baseHref}&amount=${'50'}`,
            },
            {
              type: 'transaction',
              label: 'Send 100 USDC',
              href: `${baseHref}&amount=${'100'}`,
            },
            {
              type: 'transaction',
              label: 'Send USDC',
              href: `${baseHref}&amount={amount}`,
              parameters: [
                {
                  name: 'amount', // parameter name in the `href` above
                  label: 'Enter the amount of USDC to send',
                  required: true,
                },
              ],
            },
          ],
        },
      };
  
      return Response.json(payload, {
        headers,
      });
    } catch (err) {
      console.log(err);
      let message = 'An unknown error occurred';
      if (typeof err == 'string') message = err;
      return new Response(message, {
        status: 400,
        headers,
      });
    }
  };
  
  // DO NOT FORGET TO INCLUDE THE `OPTIONS` HTTP METHOD
  // THIS WILL ENSURE CORS WORKS FOR BLINKS
  export const OPTIONS = GET;
  
  export const POST = async (req: Request) => {
    try {
      const requestUrl = new URL(req.url);
      const { amount, toPubkey } = validatedQueryParams(requestUrl);
  
      const body: ActionPostRequest = await req.json();
  
      // validate the client provided input
      let account: PublicKey;
      try {
        account = new PublicKey(body.account);
      } catch (err) {
        return new Response('Invalid "account" provided', {
          status: 400,
          headers,
        });
      }
  
      const connection = new Connection(clusterApiUrl('mainnet-beta'));
      const decimals = 6; // In the example, we use 6 decimals for USDC, but you can use any SPL token
      const mintAddress = new PublicKey(SOLANA_MAINNET_USDC_PUBKEY); // replace this with any SPL token mint address
  
      // converting value to fractional units
  
      let transferAmount: any = parseFloat(amount.toString());
      transferAmount = transferAmount.toFixed(decimals);
      transferAmount = transferAmount * Math.pow(10, decimals);
  
      const fromTokenAccount = await splToken.getAssociatedTokenAddress(
        mintAddress,
        account,
        false,
        splToken.TOKEN_PROGRAM_ID,
        splToken.ASSOCIATED_TOKEN_PROGRAM_ID,
      );
  
      let toTokenAccount = await splToken.getAssociatedTokenAddress(
        mintAddress,
        toPubkey,
        true,
        splToken.TOKEN_PROGRAM_ID,
        splToken.ASSOCIATED_TOKEN_PROGRAM_ID,
      );
  
      const ifexists = await connection.getAccountInfo(toTokenAccount);
  
      let instructions = [];
  
      if (!ifexists || !ifexists.data) {
        let createATAiX = splToken.createAssociatedTokenAccountInstruction(
          account,
          toTokenAccount,
          toPubkey,
          mintAddress,
          splToken.TOKEN_PROGRAM_ID,
          splToken.ASSOCIATED_TOKEN_PROGRAM_ID,
        );
        instructions.push(createATAiX);
      }
  
      let transferInstruction = splToken.createTransferInstruction(
        fromTokenAccount,
        toTokenAccount,
        account,
        transferAmount,
      );
      instructions.push(transferInstruction);
  
      const transaction = new Transaction();
      transaction.feePayer = account;
  
      transaction.add(...instructions);
  
      // set the end user as the fee payer
      transaction.feePayer = account;
  
      transaction.recentBlockhash = (
        await connection.getLatestBlockhash()
      ).blockhash;
  
      const payload: ActionPostResponse = await createPostResponse({
        fields: {
          type: 'transaction',
          transaction,
          message: `Donated ${amount} USDC to ${toPubkey.toBase58()}`,
        },
        // note: no additional signers are needed
        // signers: [],
      });
  
      return Response.json(payload, {
        headers,
      });
    } catch (err) {
      console.log(err);
      let message = 'An unknown error occurred';
      if (typeof err == 'string') message = err;
      return new Response(message, {
        status: 400,
        headers,
      });
    }
  };
  
  function validatedQueryParams(requestUrl: URL) {
    let toPubkey: PublicKey = new PublicKey(
      'BARKkeAwhTuFzcLHX4DjotRsmjXQ1MshGrZbn1CUQqMo',
    );
    let amount: number = 10;
  
    try {
      if (requestUrl.searchParams.get('to')) {
        toPubkey = new PublicKey(requestUrl.searchParams.get('to')!);
      }
    } catch (err) {
      throw 'Invalid input query parameter: to';
    }
  
    try {
      if (requestUrl.searchParams.get('amount')) {
        amount = parseFloat(requestUrl.searchParams.get('amount')!);
      }
  
      if (amount <= 0) throw 'amount is too small';
    } catch (err) {
      throw 'Invalid input query parameter: amount';
    }
  
    return {
      amount,
      toPubkey,
    };
  }