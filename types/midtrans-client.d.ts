declare module "midtrans-client" {
    interface SnapOptions {
        isProduction: boolean;
        serverKey: string;
        clientKey: string;
    }

    interface TransactionDetails {
        transaction_details: {
            order_id: string;
            gross_amount: number;
        };
        customer_details?: {
            email?: string;
            first_name?: string;
            last_name?: string;
            phone?: string;
        };
        item_details?: Array<{
            id: string;
            price: number;
            quantity: number;
            name: string;
        }>;
        callbacks?: {
            finish?: string;
        };
    }

    interface TransactionResult {
        token: string;
        redirect_url: string;
    }

    export class Snap {
        constructor(options: SnapOptions);
        createTransaction(transactionDetails: TransactionDetails): Promise<TransactionResult>;
    }

    export class CoreApi {
        constructor(options: SnapOptions);
    }
}
