import { Box, Container, Typography } from '@mui/material'
import { WaitingAccept } from '../components/ordrers/WaitingAccept'
import { OrderList } from '../components/OrderList'
import { EditOrder } from '../components/EditOrder'
import { useState } from 'react'

export default function Order() {
  const [selectedOrder, setSelectedOrder] = useState(null)

  const handleOrderSelect = (order) => {
    setSelectedOrder(order)
  }

  const handleCloseEdit = () => {
    setSelectedOrder(null)
  }

  const handleAcceptOrder = async (orderId) => {
    // TODO: Implement accept order logic
    console.log('Accept order:', orderId)
    setSelectedOrder(null)
  }

  const handleRejectOrder = async (orderId) => {
    // TODO: Implement reject order logic
    console.log('Reject order:', orderId)
    setSelectedOrder(null)
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 3 }}>
        <WaitingAccept onOrderSelect={handleOrderSelect} />
        <Box sx={{ mt: 4 }}>
          <OrderList onOrderSelect={handleOrderSelect} />
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

