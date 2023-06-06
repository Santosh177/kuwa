
import { redirect } from 'next/navigation';

export default async function PaymentSuccess(req,res) {
        redirect("/payment");
}
    