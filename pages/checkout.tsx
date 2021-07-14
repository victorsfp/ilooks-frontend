import Header from "../components/Layout/HeaderFixed";
import Footer from "../components/Layout/Footer";
import Facility from "../components/shop-style-five/Facility";
import CheckoutForm from "../components/checkout/CheckoutForm";

const checkout = () => {
  return (
    <>
      <Header />

      <CheckoutForm />

      <Facility />

      <Footer />
    </>
  );
};
export default checkout;
