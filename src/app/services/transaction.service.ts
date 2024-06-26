import { environment } from '../../environments/environment.development';

export interface AccountTransactionDTO {
  accountId: number;
  codeChannel: string;
  uniqueKey: string;
  transactionType: string;
  transactionSubtype: string;
  reference: string;
  ammount: number; // Asumiendo que BigDecimal se maneja como number en el cliente
  creditorAccount: string;
  debitorAccount: string;
  creationDate?: string; // Opcional, ya que el backend establece la fecha
  applyTax?: boolean;
  parentTransactionKey?: string;
  state?: string;
}

// Paso 2: Crear una función para enviar la transacción
export async function sendTransaction(transactionData: AccountTransactionDTO): Promise<void> {
  const TRANSACTION_URL = environment.coreAccountsApiUrl + '/transactions';
  try {
    const response = await fetch(TRANSACTION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transactionData),
    });

    if (!response.ok) {
      throw new Error('Error en la solicitud');
    }

    const transactionResponse = await response.json();
    console.log('Transacción procesada con éxito:', transactionResponse);
  } catch (error) {
    console.error('Error al enviar la transacción:', error);
  }
}