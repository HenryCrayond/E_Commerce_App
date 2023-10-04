import { DolorIcon } from "../assets/dolarIcon";
import { Ratings } from "../assets/ratings";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ListingCards = (props: any) => {
  const { products, handleAddCart } = props;

  return (
    <>
      <div className="mt-6 bg-white rounded overflow-hidden relative shadow-md hover:shadow-xl cursor-pointer">
        <img
          className="w-full h-40 sm:h-40 object-cover"
          src={`${
            products?.images[2] ? products?.images[2] : products?.images[0]
          }`}
          alt=""
        />
        <div className="m-4 flex justify-between items-center">
          <div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-xl font-serif">
                {products?.brand}
              </span>
              <div className="text-lime-500 m-1 flex">
                <span>
                  <Ratings />{" "}
                </span>
                <span> {products?.rating} </span>
              </div>
            </div>

            <span className="block text-gray-500 font-serif text-sm">
              {products?.title}
            </span>
            <span className="block text-gray-300">{products?.category}</span>
          </div>
          <div
            className="mt-2 p-2 bg-lime-600 rounded-lg"
            onClick={() => handleAddCart(products)}
          >
            <span className="text-white text-md font-serif">Add&nbsp;Cart</span>
          </div>
        </div>
        <div className="absolute bg-gray-400 text-white rounded-2xl p-1 top-2 left-2 flex">
          <DolorIcon />
          <span className="text-md px-1 font-medium">{products?.price}</span>
        </div>
      </div>
    </>
  );
};

export default ListingCards;
