'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid2'
import Radio from '@mui/material/Radio'
import Switch from '@mui/material/Switch'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import RadioGroup from '@mui/material/RadioGroup'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import FormControlLabel from '@mui/material/FormControlLabel'
import type { ButtonProps } from '@mui/material/Button'

// Type Imports
import type { ThemeColor } from '@core/types'

// Component Imports
import BillingCard from '@components/dialogs/billing-card'
import OpenDialogOnElementClick from '@components/dialogs/OpenDialogOnElementClick'

type DataType = {
  cardNumber?: string
  name?: string
  expiryDate?: string
  cardCvv?: string
  imgSrc?: string
  imgAlt?: string
  cardStatus?: string
  badgeColor?: ThemeColor
}

// Vars
const data: DataType[] = [
  {
    cardCvv: '587',
    name: 'Tom McBride',
    expiryDate: '12/24',
    imgAlt: 'Mastercard',
    badgeColor: 'primary',
    cardStatus: 'Primary',
    cardNumber: '5577 0000 5577 9865',
    imgSrc: '/images/logos/mastercard.png'
  },
  {
    cardCvv: '681',
    name: 'Mildred Wagner',
    expiryDate: '02/24',
    imgAlt: 'Visa card',
    cardNumber: '4532 3616 2070 5678',
    imgSrc: '/images/logos/visa.png'
  }
]

const PaymentMethod = () => {
  // States
  const [paymentMethod, setPaymentMethod] = useState<'credit' | 'cod'>('credit')
  const [creditCard, setCreditCard] = useState(0)

  // Hooks
  const [cardData, setCardData] = useState({
    cardNumber: '',
    name: '',
    expiryDate: '',
    cardCvv: ''
  })

  const handleReset = () => {
    setCardData({
      cardNumber: '',
      name: '',
      expiryDate: '',
      cardCvv: ''
    })
  }

  const buttonProps = (index: number): ButtonProps => ({
    variant: 'outlined',
    children: 'Edit',
    size: 'small',
    onClick: () => setCreditCard(index)
  })

  return (
    <Card>
      <CardHeader title='Payment Method' />
      <CardContent>
        <Grid container spacing={6}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Grid container spacing={5}>
              <Grid size={{ xs: 12 }}>
                <RadioGroup
                  row
                  name='payment-method-radio'
                  value={paymentMethod}
                  onChange={e => setPaymentMethod(e.target.value as 'credit' | 'cod')}
                >
                  <FormControlLabel value='credit' control={<Radio />} label='Credit/Debit/ATM Card' />
                  <FormControlLabel value='cash' control={<Radio />} label='COD/Cheque' />
                </RadioGroup>
              </Grid>
              {paymentMethod === 'credit' ? (
                <>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      name='number'
                      autoComplete='off'
                      label='Card Number'
                      placeholder='0000 0000 0000 0000'
                      value={cardData.cardNumber}
                      onChange={e => setCardData({ ...cardData, cardNumber: e.target.value })}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                    <TextField
                      fullWidth
                      name='name'
                      label='Name'
                      autoComplete='off'
                      placeholder='John Doe'
                      value={cardData.name}
                      onChange={e => setCardData({ ...cardData, name: e.target.value })}
                    />
                  </Grid>
                  <Grid size={{ xs: 6, lg: 3 }}>
                    <TextField
                      fullWidth
                      name='expiry'
                      autoComplete='off'
                      label='Expiry Date'
                      placeholder='MM/YY'
                      value={cardData.expiryDate}
                      onChange={e => setCardData({ ...cardData, expiryDate: e.target.value })}
                    />
                  </Grid>
                  <Grid size={{ xs: 6, lg: 3 }}>
                    <TextField
                      fullWidth
                      name='cvv'
                      label='CVV Code'
                      autoComplete='off'
                      placeholder='123'
                      value={cardData.cardCvv}
                      onChange={e => setCardData({ ...cardData, cardCvv: e.target.value })}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <FormControlLabel control={<Switch defaultChecked />} label='Save Card for future billing?' />
                  </Grid>
                </>
              ) : (
                <Grid size={{ xs: 12 }}>
                  <Typography color='text.primary'>
                    Cash on delivery is a mode of payment where you make the payment after the goods/services are
                    received.
                  </Typography>
                  <Typography color='text.primary'>
                    You can pay cash or make the payment via debit/credit card directly to the delivery person.
                  </Typography>
                </Grid>
              )}
              <Grid size={{ xs: 12 }} className='flex gap-4 flex-wrap'>
                <Button type='submit' variant='contained'>
                  Save Changes
                </Button>
                <Button type='reset' variant='outlined' color='secondary' onClick={handleReset}>
                  Reset
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }} className='flex flex-col gap-6'>
            <Typography className='font-medium' color='text.primary'>
              My Cards
            </Typography>
            {data.map((item: DataType, index: number) => (
              <div
                key={index}
                className='flex flex-col rounded bg-actionHover sm:flex-row items-start sm:justify-between'
              >
                <div className='flex flex-col items-start gap-2 p-5'>
                  <img src={item.imgSrc} alt={item.imgAlt} className='bs-6' />
                  <div className='flex items-center gap-4'>
                    <Typography className='font-medium' color='text.primary'>
                      {item.name}
                    </Typography>
                    {item.cardStatus ? (
                      <Chip variant='tonal' color={item.badgeColor} label={item.cardStatus} size='small' />
                    ) : null}
                  </div>
                  <Typography variant='body2'>
                    {item.cardNumber && item.cardNumber.slice(0, -4).replace(/[0-9]/g, '*') + item.cardNumber.slice(-4)}
                  </Typography>
                </div>
                <div className='flex flex-col gap-4 p-5'>
                  <div className='flex gap-4'>
                    <OpenDialogOnElementClick
                      element={Button}
                      elementProps={buttonProps(index)}
                      dialog={BillingCard}
                      dialogProps={{ data: data[creditCard] }}
                    />
                    <Button variant='outlined' color='error' size='small'>
                      Delete
                    </Button>
                  </div>
                  <Typography variant='body2'>Card expires at {item.expiryDate}</Typography>
                </div>
              </div>
            ))}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default PaymentMethod
