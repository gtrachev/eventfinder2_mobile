import { Alert, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { registerFormikInitialValuesType } from "../../utils/types/formikInitStateTypes";
import {
  StripeProvider,
  CardField,
  useStripe,
} from "@stripe/stripe-react-native";
import axios from "axios";
import { UserType } from "../../utils/types/modelTypes";
import { getUser } from "../../redux/actions/userActions";
import { uiActionTypes } from "../../utils/types/actionTypes/uiActionTypes";
import { useDispatch } from "react-redux";
import colors from "../../styles/colors";
import { uppercase } from "../../utils/helpers/uppercase";
import { UserTiersTypes } from "../../utils/types/userTiers";
import Button from "../../styles/styledComponents/Buttons/Button";
import AppText from "../../components/utils/AppText";

const StripeCheckoutForm: React.FC<{
  userTier: string;
  values: registerFormikInitialValuesType;
  file: any;
}> = ({ userTier, values, file }) => {
  const { createPaymentMethod, handleCardAction } = useStripe();
  const [paymentResult, setPaymentResult] = useState<any>();
  const dispatch = useDispatch();
  const handleResponse = async (paymentResponse: any) => {
    if (paymentResponse.success && paymentResponse.user) {
      await getUser()(dispatch);
      dispatch({
        type: uiActionTypes.SET_FLASH,
        payload: {
          type: "success",
          message: `Welcome ${values.username}.`,
        },
      });
    } else if (paymentResponse.requires_action) {
      // Use Stripe.js to handle the required card action
      const { error: errorAction } = await handleCardAction(
        paymentResponse.payment_intent_client_secret
      );

      if (errorAction) {
        Alert.alert("Payment failed.");
        dispatch({
          type: uiActionTypes.SET_FLASH,
          payload: { type: "error", message: "Payment failed." },
        });
      } else {
        // The card action has been handled
        stripePaymentMethodHandler(paymentResult);
      }
    } else {
      Alert.alert("Payment failed.");
      dispatch({
        type: uiActionTypes.SET_FLASH,
        payload: { type: "error", message: "Payment failed." },
      });
    }
  };

  const stripePaymentMethodHandler = async (result: any) => {
    if (result.error) {
      Alert.alert("Payment failed.", result.error.message);
    } else {
      let paymentResponse: any = undefined;
      if (file) {
        const formData = {
          file: "data:image/jpg;base64," + file["base64"],
          upload_preset: "oes8taaw",
          folder: "EventFinder_users",
        };
        const fileRes = await axios.post(
          `https://api.cloudinary.com/v1_1/drrvhe0qk/image/upload`,
          formData
        );

        const res = await axios.post<{
          user?: UserType;
          success?: string;
          error?: string;
        }>("https://eventfinder2-server.herokuapp.com/api/user/register", {
          ...values,
          userTier: userTier,
          profileImage: {
            path: fileRes.data.url,
            filename: fileRes.data.public_id,
          },
          payment_method_id: result.paymentMethod.id,
        });
        paymentResponse = await res.data;
      } else {
        const res = await axios.post<{
          user?: UserType;
          requires_action?: boolean;
          payment_intent_client_secret?: string;
          success?: string;
          error?: string;
        }>("https://eventfinder2-server.herokuapp.com/api/user/register", {
          ...values,
          userTier: userTier,
          payment_method_id: result.paymentMethod.id,
        });
        paymentResponse = await res.data;
      }

      // Handle server response
      if (paymentResponse) {
        handleResponse(paymentResponse);
      }
    }
  };

  const pay = async () => {
    // Gather customer billing information
    const billingDetails = {
      email: values.email,
    };

    // Create payment method
    const result = await createPaymentMethod({
      type: "Card",
      billingDetails,
    });
    setPaymentResult(result);

    stripePaymentMethodHandler(result);
  };

  return (
    <StripeProvider publishableKey="pk_test_51KRiOiEKyWrvmmLoET7zgzKI7hzaLuvV7mzJKcMOUnzlNze6CfnJl1go3Bu2BmFtg9DoyKgfSxe1UTGIxZDeh0qk00fGhyvgXS">
      <View>
        <AppText
          styles={{
            fontSize: 25,
            color: colors.secondaryColor,
            marginVertical: 10,
          }}
        >
          Pay with Stripe
        </AppText>
        <AppText
          styles={{
            fontSize: 20,
            color: colors.primaryColor,
            marginBottom: 10,
          }}
        >
          Purchase:{" "}
          <AppText
            styles={{
              fontSize: 20,
              color: colors.secondaryColor,
            }}
          >
            {uppercase(userTier)} account tier
          </AppText>
        </AppText>
        <AppText
          styles={{
            fontSize: 20,
            color: colors.primaryColor,
            marginBottom: 10,
          }}
        >
          Total:
          <AppText
            styles={{
              fontSize: 20,
              color: colors.secondaryColor,
            }}
          >
            {userTier === UserTiersTypes.creator ? " 20.00$" : " 50.00$"}
          </AppText>
        </AppText>
        <AppText
          styles={{
            fontSize: 20,
            color: colors.primaryColor,
          }}
        >
          Card details
        </AppText>

        <CardField
          postalCodeEnabled={true}
          placeholder={{
            number: "4242 4242 4242 4242",
          }}
          cardStyle={{
            backgroundColor: colors.whiteColor,
            textColor: colors.secondaryColor,
            textErrorColor: colors.dangerColor,
          }}
          style={{
            width: "100%",
            height: 50,
            marginVertical: 10,
            flexDirection: "column",
            flexWrap: "wrap",
            alignItems: "center",
          }}
          onCardChange={(cardDetails) => {
            console.log("cardDetails", cardDetails);
          }}
          onFocus={(focusedField) => {
            console.log("focusField", focusedField);
          }}
        />
      </View>
      <Button style={{ alignItems: "center" }} onPress={pay}>
        <AppText
          styles={{
            fontSize: 23,
            color: colors.primaryColor,
            paddingVertical: 5,
          }}
        >
          Submit payment
        </AppText>
      </Button>
    </StripeProvider>
  );
};

export default StripeCheckoutForm;

const styles = StyleSheet.create({});
