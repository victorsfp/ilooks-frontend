import { useState } from "react";
import { store } from "react-notifications-component";

//SERVICE
import api from "@services/api";

//TYPES
export type ProductDevolutionProps = {
  productDetailId: string;
  quantity: number;
};

interface SubmitRequestProps {
  orderId: any;
  devolutionMotive?:string;
  observation?:string;
  productsDevolutions: ProductDevolutionProps[];
}

const useRequestDevolution = () => {
  //STATES
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmitDevolution = async ({
    orderId,
      devolutionMotive,
      observation,
    productsDevolutions,
  }: SubmitRequestProps): Promise<any> => {
    try {
      const response = await api.post(
        `request/devolution/${orderId}`,
        productsDevolutions
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  };

  return {
    loading,
    handleSubmitDevolution,
  };
};

export default useRequestDevolution;
