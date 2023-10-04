import { useState } from "react";
import { AllProduct, ProductItems } from "../App";
import { Ratings } from "../assets/ratings";

interface Modals {
  showModal: boolean;
  products: AllProduct;
  setShowModal: () => void;
  handleDeleteCart: (id: number | undefined) => void;
  handleAddMoreProduct: (id: number, item: ProductItems) => void;
  handleLessProduct: (id: number, item: ProductItems) => void;
}

const Modal = (props: Modals) => {
  const [order, setOrder] = useState(false);
  const {
    showModal,
    setShowModal,
    products,
    handleAddMoreProduct,
    handleLessProduct,
    handleDeleteCart,
  } = props;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getTotalPrice = (arr: any) => {
    let totalPrice = 0;

    for (let i = 0; i < arr.length; i++) {
      totalPrice += arr[i].price * arr[i].cartCount;
    }

    return totalPrice;
  };

  const getTotalAmount = (price: number, discount: number) => {
    const result = Math.round((price * (100 - discount)) / 100);
    return result;
  };

  const handleSubmit = () => {
    setOrder(true);
    setTimeout(()=>{setShowModal(),setOrder(false)},1000)
  };
  return (
    <>
      {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto w-3/6">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-2xl font-semibold">Shopping Cart</h3>
                  <div
                    className="hover:bg-lime-500 hover:text-white hover:transition ease-in duration-1000 border-lime-300 md:border-2 rounded-full py-1 px-3 text-md text-lime-500 font-bold cursor-pointer traking-wider"
                    onClick={setShowModal}
                  >
                    <span className="text-black">x</span>
                  </div>
                </div>

                {order ? (
                  <div className="relative">
                    <img
                      src="https://sellcodes.com/assets/images/Purchase_Success.png"
                      alt="success"
                      style={{ height: "100%", width: "100%" }}
                    />
                    <p className="text-lime-500 font-serif text-2xl absolute top-10 right-52">
                      Successfully Placed your order
                    </p>
                  </div>
                ) : (
                  <div className="flex justify-between items-start p-6">
                    <div className="overflow-y-scroll h-64">
                      {products &&
                        products?.map((item: AllProduct, i: number) => (
                          <>
                            <div
                              className="flex justify-between items-center gap-3 mb-4"
                              key={item?.id}
                            >
                              <div>
                                <img
                                  className="w-30 h-20 object-cover"
                                  src={`${item?.images && item?.images[0]}`}
                                  alt=""
                                />
                                <button
                                  className="border-lime-300 border-2 rounded px-2 py-0 mt-1 w-full text-md text-lime-500 font-bold cursor-pointer active:bg-lime-500 active:text-white"
                                  onClick={() => handleDeleteCart(item?.id)}
                                >
                                  Delete
                                </button>
                              </div>
                              <div>
                                <span className="text-gray-600 text-xl font-serif">
                                  {item?.brand}
                                </span>
                                <span className="block text-gray-400">
                                  {item?.title}
                                </span>
                                <div className="text-lime-500 m-1 flex">
                                  <span>
                                    <Ratings />
                                  </span>
                                  <span> {item?.rating} </span>
                                </div>
                                <div>
                                  <span className="text-md px-1 font-medium text-gray-00">
                                    $ {item.price}
                                  </span>
                                </div>
                                <div className="flex justify-around items-center mt-3 gap-1">
                                  <span
                                    className="border-lime-300 border-2 rounded-full text-lg px-2 py-0 cursor-pointer active:bg-lime-500 active:text-white"
                                    onClick={() => handleLessProduct(i, item)}
                                  >
                                    -
                                  </span>
                                  <span className="border-lime-300 border-2 rounded px-2 py-0">
                                    {item?.cartCount}
                                  </span>
                                  <span
                                    className="border-lime-300 border-2 rounded-full text-lg px-2 py-0 cursor-pointer active:bg-lime-500 active:text-white"
                                    onClick={() =>
                                      handleAddMoreProduct(i, item)
                                    }
                                  >
                                    +
                                  </span>
                                </div>
                              </div>
                            </div>
                          </>
                        ))}
                    </div>

                    <div>
                      <ul className="flex justify-between items-center ">
                        <li className="block text-gray-900 text-md font-serif ">
                          Price
                        </li>
                        <li className="block text-gray-400">
                          {getTotalPrice(products)}
                        </li>
                      </ul>
                      <ul className="flex justify-between items-center ">
                        <li className="block text-gray-900 text-md font-serif">
                          Discount
                        </li>
                        <li className="block text-gray-400"> 10% </li>
                      </ul>
                      <ul className="flex justify-between items-center">
                        <li className="block text-gray-900 text-md font-serif">
                          Delivery Charges
                        </li>
                        <li className="block text-gray-400"> 0.00 </li>
                      </ul>
                      <ul className="flex justify-between items-center mt-2">
                        <li className="block text-gray-600 text-xl font-serif">
                          Total Amount
                        </li>
                        <li className="block text-gray-400">
                          {getTotalAmount(getTotalPrice(products), 10)}{" "}
                        </li>
                      </ul>
                      <div className="mt-5 block">
                        <h3 className="font-serif text-md text-gray-400 ">
                          Thank you welcome order again
                        </h3>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-end p-2 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-lime-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={setShowModal}
                  >
                    Close
                  </button>
                  <button
                    className="text-white bg-lime-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => handleSubmit()}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
