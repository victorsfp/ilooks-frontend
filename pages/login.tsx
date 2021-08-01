import React, { useEffect } from "react";
import Link from "next/link";

//COMPONENT
import HeaderFixed from "@components/Layout/HeaderFixed";
import Footer from "@components/Layout/Footer";
import Facility from "@components/shop-style-five/Facility";

import ContainerCenterCol6 from "@components/Layout/Container/CenterCol6";
import Form from "@components/Form";
import InputEmail from "@components/Form/Input/Email";
import InputPassword from "@components/Form/Input/Password";
import ButtonPrimary from "@components/Button/Primary";

//HOOKS
import useLogin from "@hooks/pages/useLogin";

const Login = () => {
  const { loading, register, handleSubmit, onLogin, errors } = useLogin();

  return (
    <>
      <HeaderFixed />
      <ContainerCenterCol6>
        <div className="section-title">
          <h2>
            <span className="dot"></span> Login
          </h2>
        </div>

        <Form onSubmit={handleSubmit(onLogin)}>
          <InputEmail {...register("email")} errors={errors.email} />

          <InputPassword {...register("password")} errors={errors.password} />

          <ButtonPrimary type="submit" loading={loading}>
            Entrar
          </ButtonPrimary>

          <Link href="/password/forgot">
            <a className="forgot-password">Perdeu a senha ?</a>
          </Link>
        </Form>
      </ContainerCenterCol6>

      <Facility />

      <Footer />
    </>
  );
};

export default Login;
