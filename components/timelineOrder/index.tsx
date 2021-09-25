import {OrderStatusProps} from "@components/orderItem";
import {useEffect, useState} from "react";

interface TimeLineOrderProps {
	orderStatus: string;
	statusHistory: OrderStatusProps[];
}

interface historyStatusProps {
	orderPlaced?: string;
	reservedPayment?: string;
	withCarrier?: string;
	onCarriage?: string;
	delivered?: string;
}

const TimeLineOrder = ({orderStatus, statusHistory}: TimeLineOrderProps) => {
	const [history, setHistory] = useState({});
	const dateOptions = {day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit', hour12:false};
	
	useEffect(() => {
			console.log('STA:', statusHistory);
			const tempHistory: historyStatusProps = {
				orderPlaced: statusHistory.filter((h) => {
					return h.status_request.toLowerCase() == 'realizado'
				})[0]?.change_date ?? '',
				reservedPayment: statusHistory.filter((h) => {
					return h.status_request.toLowerCase() == 'pagamento'
				})[0]?.change_date ?? '',
				withCarrier: statusHistory.filter((h) => {
					return h.status_request.toLowerCase() == 'transportadora'
				})[0]?.change_date ?? '',
				onCarriage: statusHistory.filter((h) => {
					return h.status_request.toLowerCase() == 'transito'
				})[0]?.change_date ?? '',
				delivered: statusHistory.filter((h) => {
					return h.status_request.toLowerCase() == 'entregue'
				})[0]?.change_date ?? '',
			}
			setHistory(tempHistory);
			
			console.log('HST',tempHistory);
		},[]
	);
	
	return (
		<div className="timeline">
			
			<div className={`circle ${history.orderPlaced && 'active'}`}>
				<div className="icon"></div>
				<div className="labels">
					<span className="title-circle">Pedido<br/>realizado</span>
					<span className="description-circle">{history.orderPlaced && new Date(history.orderPlaced).toLocaleString('pt-BR',dateOptions)}</span>
				</div>
				<div className="line"></div>
			</div>
			
			<div className={`circle ${history.reservedPayment && 'active'}`}>
				<div className="icon"></div>
				<div className="labels">
					<span className="title-circle">Pagamento<br/>pré-reservado</span>
					<span className="description-circle">{history.reservedPayment && new Date(history.reservedPayment).toLocaleString('pt-BR',dateOptions)}</span>
				</div>
				<div className="line"></div>
			</div>
			
			<div className={`circle ${history.withCarrier && 'active'}`}>
				<div className="icon"></div>
				<div className="labels">
					<span className="title-circle">Com transportadora</span>
					<span className="description-circle">{history.withCarrier && new Date(history.withCarrier).toLocaleString('pt-BR',dateOptions)}</span>
				</div>
				<div className="line"></div>
			</div>
			
			<div className={`circle ${history.onCarriage ? 'active' : ''}`}>
				<div className="icon"></div>
				<div className="labels">
					<span className="title-circle">Em tranporte</span>
					<span className="description-circle">{history.onCarriage && new Date(history.onCarriage).toLocaleString('pt-BR',dateOptions)}</span>
				</div>
				<div className="line"></div>
			</div>
			
			<div className={`circle end ${history.delivered && 'active'}`}>
				<div className="icon"></div>
				
				<div className="labels">
					<span className="title-circle">Entregue</span>
					<span className="description-circle">{history.delivered && new Date(history.delivered).toLocaleString('pt-BR',dateOptions)}</span>
				</div>
			</div>
		
		</div>)
}

export default TimeLineOrder