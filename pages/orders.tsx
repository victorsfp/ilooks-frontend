import {GetServerSideProps}         from 'next';
import {parseCookies}               from 'nookies';
import React, {useEffect, useState} from 'react';
import {useDispatch}                from 'react-redux';
import ButtonPrimary                from '../components/Button/Primary';
import Details                      from '../components/Detalis';
import FieldSearch                  from '../components/FieldSearch';
import Footer                       from '../components/Layout/Footer';

import HeaderFixed         from '../components/Layout/HeaderFixed';
import OrderItem           from '../components/orderItem';
import Facility            from '../components/shop-style-five/Facility';
import useLogin            from '../hooks/pages/useLogin';
import api, {getAPIClient} from '../services/api';

const Orders = () => {
  const dispatch = useDispatch();
  const {onLogout} = useLogin();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    api.get('/request/period/864000')
       .then((response) => {
         console.log('Retorno: ');
         console.log(response.data);
       })
       .catch((error) => {
         console.log(error);
       });

    setOrders([
                {
                  numberOrder: 123456789,
                  orderStatus: 'pagamento',
                  items:       [
                    {
                      title:    'Vestido teste rosa - verão',
                      imageUrl:
                                'https://raw.githubusercontent.com/victorsfp/ilooks-frontend/em/limpeza/images/img1.jpg',
                      quantity: 2,
                    },
                    {
                      title:    'Vestido teste rosa - verão',
                      imageUrl:
                                'https://raw.githubusercontent.com/victorsfp/ilooks-frontend/em/limpeza/images/img1.jpg',
                      quantity: 2,
                    },
                  ],
                },
                ,
                {
                  numberOrder: 123456789,
                  orderStatus: 'transportadora',
                  items:       [
                    {
                      title:    'Vestido teste rosa - verão',
                      imageUrl:
                                'https://raw.githubusercontent.com/victorsfp/ilooks-frontend/em/limpeza/images/img1.jpg',
                      quantity: 2,
                    },
                    {
                      title:    'Casaco teste bege - inverno',
                      imageUrl:
                                'https://raw.githubusercontent.com/victorsfp/ilooks-frontend/em/limpeza/images/img2.jpg',
                      quantity: 3,
                    },
                    {
                      title:    'Camiseta teste vermelha - verão',
                      imageUrl:
                                'https://raw.githubusercontent.com/victorsfp/ilooks-frontend/em/limpeza/images/img3.jpg',
                      quantity: 4,
                    },
                  ],
                },
                {
                  numberOrder: 123456789,
                  orderStatus: 'entregue',
                  items:       [
                    {
                      title:    'Vestido teste rosa - verão',
                      imageUrl:
                                'https://raw.githubusercontent.com/victorsfp/ilooks-frontend/em/limpeza/images/img1.jpg',
                      quantity: 2,
                    },
                    {
                      title:    'Casaco teste bege - inverno',
                      imageUrl:
                                'https://raw.githubusercontent.com/victorsfp/ilooks-frontend/em/limpeza/images/img2.jpg',
                      quantity: 3,
                    },
                    {
                      title:    'Camiseta teste vermelha - verão',
                      imageUrl:
                                'https://raw.githubusercontent.com/victorsfp/ilooks-frontend/em/limpeza/images/img3.jpg',
                      quantity: 4,
                    },
                  ],
                },
              ]);
  };

  return (
    <>
      <HeaderFixed/>
      <section className="login-area ptb-60">
        <div
          className="container"
          style={{
            marginTop: -35,
          }}
        >
          <h1>Meus pedidos</h1>
          <div className="container-order">
            <div className="container-order-options">
              <Details/>
            </div>

            <div className="container-order-content">
              {/* <h5>Pedidos</h5> */}
              <div className="container-order-content-items">
                <FieldSearch/>

                {orders &&
                 orders.length > 0 &&
                 orders.map((order, index) => (
                   <OrderItem
                     key={index}
                     orderStatus={order.orderStatus}
                     numberOrder={order.numberOrder}
                     items={order.items}
                   />
                 ))}

                <button
                  className="btn-primary-br"
                  style={{
                    marginTop: 20,
                  }}
                >
                  ver mais pedidos
                </button>

                <ButtonPrimary type="button" onClick={onLogout}>
                  Sair
                </ButtonPrimary>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Facility/>

      <Footer/>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx);
  const {'nextilooks.auth': auth} = parseCookies(ctx);

  if (!auth) {
    return {
      redirect: {
        destination: '/',
        permanent:   false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Orders;
