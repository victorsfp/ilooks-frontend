import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {toast} from "react-toastify";
import Link from "next/link";
import Head from "next/head";

//REDUX
import {card} from "../../store/ducks/Card/types";
import {addToCart} from "../../store/ducks/Card/actions";

//COMPONENTS
import CircleColors from "@components/CircleColors";
import SizeGuide from "./SizeGuide";
import Shipping from "./Shipping";

//TYPES
import {ProductsDetails,} from "../../store/ducks/products/types";
import {ProductReponse} from "@type/global";

interface StateProps {
	product?: ProductReponse;
	card?: card[];
	setImages?: any;
}

const ProductContent = ({product, card, setImages}: StateProps) => {
	const dispatch = useDispatch();
	const [qty, setQty] = useState(1);
	const [max, setMax] = useState(15);
	const [min, setMin] = useState(1);
	const [sizeGuide, setSizeGuide] = useState(false);
	const [shipModal, setShipModal] = useState(false);
	
	const [detailsProductAll, setDetailsProductAll] = useState<ProductsDetails[]>(
		[]
	);
	
	const [allColors, setAllColors] = useState<string[]>([]);
	const [colorSelect, setColorSelected] = useState<string>();
	
	const [allSizes, setAllSizes] = useState<any[]>([]);
	const [sizeSelected, setSizeSelected] = useState("");
	
	useEffect(() => {
		setDetailsProductAll(product.details_product);
		
		const allColorsWithRep = product.details_product.map(
			(detail) => detail.color
		);
		var allColorsWithoutRept = allColorsWithRep.filter(function (este, i) {
			return allColorsWithRep.indexOf(este) === i;
		});
		setAllColors(allColorsWithoutRept);
		setColorSelected(allColorsWithoutRept[0]);
	}, [product]);
	
	useEffect(() => {
		const detail = product.details_product.filter(
			(detail) => detail.color === colorSelect
		);
		
		if (detail.length > 0 && detail[0].photos.length > 0) {
			const photos = detail[0].photos.map((photo, index) => ({
				id: index,
				image: photo,
			}));
			
			setImages && setImages([...photos]);
		}
		
		//setSizeSelected("");
		const sizes = detail.map((size) => size.size);
		sizes.sort((a, b) => {
			if (a === 'U' || a === 'P' || a === 'M' || a === 'G' || a === 'GG' ||
				b === 'U' || b === 'P' || b === 'M' || b === 'G' || b === 'GG') {
				if ((a === 'P' || a === 'U') ||
					(a === 'M' && (b === 'G' || b === 'GG')) ||
					(a === 'G' && b === 'GG')) {
					return -1;
				}
			}
			return Number(a) < Number(b) ? -1 : 0;
		});
		setSizeSelected(sizes[0]?.toString() ?? "");
		
		setAllSizes(sizes);
	}, [colorSelect]);
	
	function addItemCart(item) {
		if (!sizeSelected || sizeSelected.length === 0) {
			toast.warn("Por favor selecione ao menos um tamanho", {
				position: "bottom-left",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			});
			return;
		}
		
		if (!colorSelect || colorSelect.length === 0) {
			toast.warn("Por favor selecione ao menos uma cor", {
				position: "bottom-left",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			});
			return;
		}
		
		if (qty > max) {
			setQty(max);
			return;
		}
		
		const detailSelected = detailsProductAll.find(
			(detail) => detail.size === sizeSelected && detail.color === colorSelect
		);
		
		if (!detailSelected) {
			toast.error(
				"Ocorreu um erro ao adicionar ao carrinho, por favor tente novamente mais tarde.",
				{
					position: "bottom-left",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
				}
			);
			return;
		}
		
		const ccart = JSON.parse(localStorage.getItem("@ilooksecommerce_cart"));
		const product = ccart?.find((prod) => prod.id === item.id);
		const qtyRequested = (product?.qty ?? 0) + qty;
		
		if (detailSelected.quantity < qtyRequested) {
			toast.warn(
				`Estoque disponível de ${detailSelected.quantity} para esta peça nesta cor e tamanho`,
				{
					position: "bottom-left",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
				}
			);
			return;
		}
		
		if (qtyRequested > 15) {
			toast.warn(
				`Quantidade máxima de 15 peças por produto`,
				{
					position: "bottom-left",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
				}
			);
			return;
		}
		
		dispatch(
			addToCart({
				...item,
				total: item.price * qty,
				title: item.name,
				image: detailSelected.photos[0],
				imageHover: detailSelected.photos[0],
				productDetail: detailSelected,
			})
		);
		
		toast.success("Adicionado ao carrinho", {
			position: "bottom-left",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
		});
		
		setQty(1);
	}
	
	const IncrementItem = () => {
		if (qty < max) {
			return setQty(qty + 1);
		} else {
			return null;
		}
	};
	
	const DecreaseItem = () => {
		if (qty > 1) {
			return setQty(qty - 1);
		}
	};
	
	const openSizeGuide = () => {
		return setSizeGuide(true);
	};
	
	const closeSizeGuide = () => {
		return setSizeGuide(false);
	};
	
	const openShipModal = () => {
		setShipModal(true);
	};
	
	const closeShipModal = () => {
		setShipModal(false);
	};
	
	const handleActiveColor = (color: string) => {
		setColorSelected(color);
	};
	
	return (
		<>
			<Head>
				<title>{product?.name}</title>
			</Head>
			<div className="col-lg-6 col-md-6">
				<div className="product-details-content">
					<h3>{product?.name}</h3>
					
					<div className="price">
            <span className="new-price">
              {new Intl.NumberFormat("br-BR", {
	              style: "currency",
	              currency: "BRL",
              }).format(product?.price)}
            </span>
					</div>
					
					{/* <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et.
          </p> */}
					
					<ul className="product-info">
						<li>
							<span>Marca:</span>{" "}
							<Link href={`/products?provider=${product.provider.id}`}>
								<a>{product.provider.name}</a>
							</Link>
						</li>
						{/*						<li>
							<span>Em Estoque:</span>{" "}
							<Link href="#">
								<a>
									{product.quantity_all} iten
									{product.quantity_all > 0 ? "s" : ""}
								</a>
							</Link>
						</li>*/}
						<li>
							<span>Composição:</span>{" "}
							<Link href="#">
								<a>{product.materialType}</a>
							</Link>
						</li>
					</ul>
					
					<div className="product-color-switch">
						<h4>Cor:</h4>
						
						<div
							style={{
								display: "flex",
								flexDirection: "row",
							}}
						>
							{allColors.map((color, index) => (
								<CircleColors
									key={`${index}${color}color`}
									color={color}
									active={color === colorSelect}
									onClick={() => {
										handleActiveColor(color);
									}}
								/>
							))}
						</div>
					
					
					</div>
					
					<div className="product-size-wrapper">
						<h4>Tamanho:</h4>
						
						<ul>
							{allSizes.map((size, index) => (
								<>
									{detailsProductAll.find(
										(s) => s.size === size && s.color === colorSelect
									) &&
									detailsProductAll.find(
										(s) => s.size === size && s.color === colorSelect
									).quantity > 0 ? (
										<li
											key={`${index}${size}size`}
											className={size === sizeSelected ? "active" : ""}
											style={{
												cursor: "pointer",
											}}
											onClick={() => {
												setSizeSelected(size);
											}}
										>
											<a>{size}</a>
										</li>
									) : (
										<></>
									)}
								</>
							))}
						</ul>
					
					
					</div>
					
					<div className="product-info-btn">
						<a onClick={openShipModal} style={{cursor: "pointer"}}>
							<i className="fas fa-truck"></i> Entrega
						</a>
					</div>
					
					<div className="product-add-to-cart">
						<div className="input-counter">
              <span className="minus-btn" onClick={DecreaseItem}>
                <i className="fas fa-minus"></i>
              </span>
							<input
								type="text"
								value={qty}
								min={min}
								max={max}
								onChange={(e) =>
									setQty(
										Number(e.target.value) > max
											? max
											: Number(e.target.value)
									)
								}
							/>
							<span className="plus-btn" onClick={IncrementItem}>
                <i className="fas fa-plus"></i>
              </span>
						</div>
						
						<button
							type="submit"
							className="btn btn-primary"
							onClick={() => addItemCart({...product, qty})}
						>
							<i className="fas fa-cart-plus"></i> Adicionar ao Carrinho
						</button>
					</div>
					
					{/*<div className="buy-checkbox-btn">
            <div className="item">
              <Link href="#">
                <a className="btn btn-primary">Compre Agora</a>
              </Link>
            </div>
          </div>*/}
					
					<div className="custom-payment-options">
						<span>Check-out seguro garantido:</span>
						
						<div className="payment-methods">
							<Link href="#">
								<a>
									<img
										src={require("../../images/payment-image/1.svg")}
										alt="image"
									/>
								</a>
							</Link>
							
							<Link href="#">
								<a>
									<img
										src={require("../../images/payment-image/2.svg")}
										alt="image"
									/>
								</a>
							</Link>
							
							<Link href="#">
								<a>
									<img
										src={require("../../images/payment-image/3.svg")}
										alt="image"
									/>
								</a>
							</Link>
							
							<Link href="#">
								<a>
									<img
										src={require("../../images/payment-image/4.svg")}
										alt="image"
									/>
								</a>
							</Link>
							
							<Link href="#">
								<a>
									<img
										src={require("../../images/payment-image/5.svg")}
										alt="image"
									/>
								</a>
							</Link>
							
							<Link href="#">
								<a>
									<img
										src={require("../../images/payment-image/6.svg")}
										alt="image"
									/>
								</a>
							</Link>
							
							<Link href="#">
								<a>
									<img
										src={require("../../images/payment-image/7.svg")}
										alt="image"
									/>
								</a>
							</Link>
						</div>
					</div>
				</div>
			</div>
			{sizeGuide ? <SizeGuide closeSizeGuide={closeSizeGuide}/> : ""}
			{shipModal ? <Shipping closeShipModal={closeShipModal}/> : ""}
		</>
	);
};

// const mapStateToProps = (state) => {
//   return {
//     card: state.card,
//   };
// };

// export default connect(mapStateToProps)(ProductContent);
export default ProductContent;
