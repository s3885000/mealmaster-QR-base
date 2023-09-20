import React, { useCallback, useEffect, useState } from 'react';
import { Navigation, Header, Items, Popups } from '../../components'; 
import { useDispatch, useSelector } from 'react-redux';
import './ongoing.css';
import { fetchOnGoingOrders } from '../../redux/actions/onGoingActions';
import { decodeToken } from '../../services/api';

const OnGoing = () => {
    const [checkedTables, setCheckedTables] = useState(new Array(8).fill(false));  
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [popupVisible, setPopupVisible] = useState(false);

    const handleCheckboxChange = useCallback((index) => {
        const newCheckedTables = [...checkedTables];
        newCheckedTables[index] = !newCheckedTables[index];
        setCheckedTables(newCheckedTables);
    });

    const dispatch = useDispatch();
    const { onGoingOrders } = useSelector(state => state.onGoing);

    useEffect(() => {
        const fetchOrders = () => {
            const decodedData = decodeToken();
            const userIdFromToken = decodedData?.userId;
            if (userIdFromToken) {
                dispatch(fetchOnGoingOrders(userIdFromToken));
            }
        };

        fetchOrders(); // fetch immediately once

        const intervalId = setInterval(() => {
            fetchOrders(); // fetch every 10 seconds
        }, 5000);

        return () => clearInterval(intervalId); // Clear the interval when component is unmounted
    }, [dispatch]);

    // Sorting and Grouping logic
    const sortedOrders = onGoingOrders.sort((a, b) => new Date(a.order_status_timestamp) - new Date(b.order_status_timestamp));
    const groupedOrders = sortedOrders.reduce((acc, order) => {
        if (!acc[order.latestStatusDescription]) {
            acc[order.latestStatusDescription] = [];
        }
        acc[order.latestStatusDescription].push(order);
        return acc;
    }, {});

    const handleOrderDetailClick = (orderData) => {
        setSelectedOrder(orderData);
        setPopupVisible(true);
    };

    const handleClosePopup = () => {
        setPopupVisible(false);
    };

    const renderOrder = (order, idx) => {
        return (
            <Items 
                key={idx} 
                type="orders"
                data={order}
                state={order.latestStatusDescription}
                isSelected={checkedTables[idx]}
                index={idx}
                onCheckboxChange={handleCheckboxChange}
                onDetailClick={handleOrderDetailClick}
                setSelectedOrder={setSelectedOrder}
                selectedOrder={selectedOrder}
            />
        );
    };

    const pendingAcceptanceOrders = (groupedOrders['ORDER_PENDING_ACCEPTANCE'] || []).map(renderOrder);
    const confirmedOrders = (groupedOrders['ORDER_CONFIRMED'] || []).map(renderOrder);
    const inProgressOrders = (groupedOrders['ORDER_IN_PROGRESS'] || []).map(renderOrder);
    const readyOrders = (groupedOrders['ORDER_READY'] || []).map(renderOrder);
    const allOrders = [...pendingAcceptanceOrders, ...confirmedOrders, ...inProgressOrders, ...readyOrders];

    return (
        <div className="tables-screen h-screen flex overflow-x-hidden flex-col" style={{ overflowX: 'hidden', overflowY: 'hidden' }}>
            <Header title="Tables" className="flex flex-col items-center" />
            <Navigation className="flex-none" />
            <div className="flex-auto flex flex-col items-start mt-5 px-8">
                <div className="flex justify-between items-center w-full mb-4">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">On-Going orders</h1>
                    </div>
                </div>
                {allOrders.map((order, idx) => (
                    <div key={idx} className='mb-5'>
                        {order}
                    </div>
                ))}
            </div>
            {popupVisible && selectedOrder && (
                <Popups
                    visible={popupVisible}
                    type="order_details_ready" 
                    onClose={handleClosePopup}
                    data={{
                        orderDetails: {
                            order_id: `#${selectedOrder.unique_id}`,
                            timestamp: selectedOrder.orderStatus[0].timestamp,
                            table: selectedOrder.table.table_no,
                            total: selectedOrder.total_price,
                        },
                        items: selectedOrder.items,
                    }}
                />
            )}
        </div>
    );
};

export default OnGoing;
