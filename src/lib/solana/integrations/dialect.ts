import { Connection, PublicKey } from '@solana/web3.js';
import { Dialect, DialectNotification } from '@dialectlabs/web3';
import { getWalletAdapter } from '@/lib/wallet/get-wallet-adapter';

/**
 * Initializes Dialect client for Solana integration.
 * @param rpcUrl - Solana RPC URL for the connection.
 * @returns Dialect client instance.
 */
export const initializeDialectClient = async (rpcUrl: string) => {
  const connection = new Connection(rpcUrl, 'confirmed');
  const wallet = getWalletAdapter();

  if (!wallet.publicKey) {
    throw new Error('Wallet not connected');
  }

  const dialect = new Dialect(connection, wallet);
  return dialect;
};

/**
 * Fetches messages from a specific thread.
 * @param dialect - Dialect client instance.
 * @param threadId - PublicKey of the thread.
 * @returns Array of messages in the thread.
 */
export const fetchMessages = async (
  dialect: Dialect,
  threadId: PublicKey
): Promise<DialectNotification[]> => {
  try {
    const messages = await dialect.getThreadMessages(threadId);
    return messages;
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
};

/**
 * Sends a message to a Dialect thread.
 * @param dialect - Dialect client instance.
 * @param threadId - PublicKey of the thread.
 * @param message - Message content to send.
 * @returns The result of the send operation.
 */
export const sendMessage = async (
  dialect: Dialect,
  threadId: PublicKey,
  message: string
) => {
  try {
    const result = await dialect.sendMessage(threadId, message);
    return result;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

/**
 * Creates a new Dialect thread.
 * @param dialect - Dialect client instance.
 * @param participants - Array of participant public keys.
 * @returns Newly created thread information.
 */
export const createThread = async (
  dialect: Dialect,
  participants: PublicKey[]
) => {
  try {
    const thread = await dialect.createThread(participants);
    return thread;
  } catch (error) {
    console.error('Error creating thread:', error);
    throw error;
  }
};
