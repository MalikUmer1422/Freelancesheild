import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  const { session_id } = req.query;
  if (!session_id) return res.redirect(302, "/");

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY  // Service role key (server only)
    );

    // Verify the Stripe session
    const session = await stripe.checkout.sessions.retrieve(session_id);
    if (session.payment_status === "paid" || session.status === "complete") {
      const userId = session.metadata?.userId;
      if (userId) {
        // Update user profile to pro
        await supabase
          .from("profiles")
          .update({ is_pro: true, stripe_customer_id: session.customer })
          .eq("id", userId);
      }
    }

    // Redirect back to the app with success indicator
    return res.redirect(302, `${process.env.SITE_URL}?pro=success`);
  } catch (err) {
    console.error("Verify payment error:", err);
    return res.redirect(302, "/");
  }
}
