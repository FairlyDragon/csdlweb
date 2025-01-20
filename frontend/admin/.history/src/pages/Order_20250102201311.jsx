import { Box, Container } from '@mui/material'
import { WaitingAccept } from '../components/orders/WaitingAccept'
import { OrderList } from '../components/orders/OrderList'
import { EditOrder } from '../components/orders/EditOrder'
import { useState, useEffect } from 'react'

// Sample data
const sampleOrders: Order[] = [
  {
    order_id: '00001',
    user_id: 1,
    OrderDate: '2024-01-04',
    TotalAmount: 17.97,
    Status: 'completed',
    Note: '',
    DiscountApplied: 0,
    name: 'Nguyen Van A',
    address: '354 Nguyen Tri',
    food: 'Fried Rice'
  },
  {
    order_id: '00002',
    user_id: 2,
    OrderDate: '2024-01-05',
    TotalAmount: 17.97,
    Status: 'waiting',
    Note: '',
    DiscountApplied: 0,
    name: 'Ho Thi B',
    address: '20 Tay Son',
    food: 'Fried Rice'
  }
]

export default function Order() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    // Initialize localStorage with sample data if empty
    const storedOrders = localStorage.getItem('orders')
    if (!storedOrders) {
      localStorage.setItem('orders', JSON.stringify(sampleOrders))
      setOrders(sampleOrders)
    } else {
      setOrders(JSON.parse(storedOrders))
    }
  }, [])

  const handleOrderSelect = (order: Order) => {
    setSelectedOrder(order)
  }

  const handleCloseEdit = () => {
    setSelectedOrder(null)
  }

  const updateLocalStorage = (updatedOrders: Order[]) => {
    localStorage.setItem('orders', JSON.stringify(updatedOrders))
    setOrders(updatedOrders)
  }

  const handleAcceptOrder = async (orderId: string) => {
    const updatedOrders = orders.map(order => 
      order.order_id === orderId 
        ? { ...order, Status: 'processing' as const }
        : order
    )
    updateLocalStorage(updatedOrders)
    setSelectedOrder(null)
  }

  const handleRejectOrder = async (orderId: string) => {
    const updatedOrders = orders.map(order => 
      order.order_id === orderId 
        ? { ...order, Status: 'rejected' as const }
        : order
    )
    updateLocalStorage(updatedOrders)
    setSelectedOrder(null)
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 3 }}>
        <WaitingAccept 
          onOrderSelect={handleOrderSelect} 
          orders={orders.filter(order => order.Status === 'waiting')}
        />
        <Box sx={{ mt: 4 }}>
          <OrderList 
            onOrderSelect={handleOrderSelect}
            orders={orders}
          />
        </Box>
        {selectedOrder && (
          <EditOrder
            order={selectedOrder}
            onClose={handleCloseEdit}
            onAccept={handleAcceptOrder}
            onReject={handleRejectOrder}
          />
        )}
      </Box>
    </Container>
  )
}

