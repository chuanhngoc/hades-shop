import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { BsTrash } from "react-icons/bs";
import {
  decreaseQuantity,
  getTotalPrice,
  increaseQuantity,
  removeCartItem,
} from "../../redux/cartSlice";

const Cart = () => {
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate("/");
  };

  const handleDecreaseCartQuantity = (product) => {
    dispatch(decreaseQuantity(product));
    dispatch(getTotalPrice());
  };

  const handleIncreaseCartQuantity = (product) => {
    dispatch(increaseQuantity(product));
    dispatch(getTotalPrice());
  };

  const handleRemoverCartItem = (product) => {
    dispatch(removeCartItem(product));
    dispatch(getTotalPrice());
  };

  const setComma = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div className="mt-32">
      <div className="text-center text-36 font-medium">GIỎ HÀNG CỦA BẠN</div>
      <div className="flex justify-center gap-8 mt-6">
        <div className="px-5 py-3 w-[800px] bg-gray-100">
          <p>Bạn đang có {cart.totalQuantity} sản phẩm trong giỏ hàng</p>
          {cart.cartItems.map((item, index) => {
            return (
              <div key={index}>
                <div className="flex gap-3 justify-between items-center py-2 pl-1 my-4 border-b bg-white">
                  <Link to={`/product/${item.id}`}>
                    <img
                      src={item.imageUrl}
                      alt=""
                      className="h-[112px] w-[100px] cursor-pointer"
                    />
                  </Link>
                  <div className="inline-flex flex-col w-[30%] pl-5">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-gray-500">
                      {item.color} / {item.size}
                    </p>
                  </div>
                  <div className="inline-flex w-1/5">
                    <div className="flex border border-gray-300">
                      <button
                        className="py-1 w-6 bg-gray-100 cursor-pointer text-center"
                        onClick={() => handleDecreaseCartQuantity(item)}
                      >
                        -
                      </button>
                      <p className="py-1 w-7 text-center text-12">
                        {item.cartQuantity}
                      </p>
                      <button
                        className="py-1 w-6 bg-gray-100 cursor-pointer text-center"
                        onClick={() => handleIncreaseCartQuantity(item)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <p className="inline-flex w-[15%] text-gray-400 text-16">
                    {item.price}.000₫
                  </p>
                  <div className="inline-flex w-[25%] flex-col items-center">
                    <p className="text-13 font-thin">Thành tiền:</p>
                    <span className="text-red-700">
                      {setComma(item.price * item.cartQuantity)}.000₫
                    </span>
                    <div
                      className="mt-2 flex justify-center cursor-pointer"
                      onClick={() => handleRemoverCartItem(item)}
                    >
                      <BsTrash />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div>
          <div className="py-5 px-3 border border-gray-300 h-min">
            <h3 className="font-medium text-20 pb-3 border-b border-gray-300">
              Thông tin đơn hàng
            </h3>
            <div className="flex justify-between gap-24 mt-4 pb-3 border-b border-gray-300">
              <p className="">Tổng tiền:</p>
              <p className="w-[80px]">{setComma(cart.totalPrice)}.000₫</p>
            </div>
            <div className="mt-2 py-3 w-full bg-black text-white font-semibold uppercase text-center cursor-pointer">
              Thanh toán
            </div>
          </div>
          <div
            className="mt-3 font-thin text-center cursor-pointer"
            onClick={handleBackHome}
          >
            Tiếp tục mua hàng →
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
