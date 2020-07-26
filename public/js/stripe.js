/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
 'pk_test_51H8YN7DFYLIoTzkqHK7SBgDDFt7RKqtCbobnuPS9lBj3Wh3M9asxIxw4vBPHUcFlygdic8x15WrWfADgD027G6ra007qzo8pQm'
);

export const bookTour = async (tourId) => {
 try {
  //1 get checkout session from the server
  const session = await axios(
   `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
  );

  //2 Cretea checkout fomr and charge credit card
  await stripe.redirectToCheckout({
   sessionId: session.data.session.id,
  });
 } catch (err) {
  console.log(err);
  showAlert('error', err);
 }
};
