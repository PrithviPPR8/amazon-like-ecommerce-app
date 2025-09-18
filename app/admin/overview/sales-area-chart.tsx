'use client'

import ProductPrice from "@/components/shared/product/ProductPrice"
import { Card, CardContent } from '@/components/ui/card'
import useColorStore from '@/hooks/use-color-store'
import { formatDateTime } from '@/lib/utils'
import { useTheme } from 'next-themes'
import React from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from 'recharts'

// Chart data model
interface SalesData {
  date: string
  totalSales: number
}

// Custom tooltip props with stricter payload typing
interface CustomTooltipProps extends TooltipProps<number, string> {
  active?: boolean
  payload?: Array<{
    value: number
    payload: SalesData
  }>
  label?: string
}

// Tick props for the custom X axis renderer
interface TickProps {
  x: number
  y: number
  payload: {
    value: string | number
  }
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    const salesRecord = payload[0].payload // full { date, totalSales }

    return (
      <Card>
        <CardContent className="p-2">
          <p>{formatDateTime(new Date(salesRecord.date)).dateOnly}</p>
          <p className="text-primary text-xl">
            <ProductPrice price={payload[0].value} plain />
          </p>
        </CardContent>
      </Card>
    )
  }
  return null
}

const CustomXAxisTick: React.FC<TickProps> = ({ x, y, payload }) => {
  return (
    <text x={x} y={y + 10} textAnchor="start" fill="#666" className="text-xs">
      {formatDateTime(new Date(payload.value)).dateOnly}
    </text>
  )
}

const STROKE_COLORS: { [key: string]: { [key: string]: string } } = {
  Red: { light: '#980404', dark: '#ff3333' },
  Green: { light: '#015001', dark: '#06dc06' },
  Gold: { light: '#ac9103', dark: '#f1d541' },
}

export default function SalesAreaChart({ data }: { data: SalesData[] }) {
  const { theme } = useTheme()
  const { cssColors, color } = useColorStore(theme)

  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart data={data}>
        <CartesianGrid horizontal vertical={false} stroke="" />
        <XAxis
          dataKey="date"
          tick={(props) => <CustomXAxisTick {...props} />}
          interval={3}
        />
        <YAxis fontSize={12} tickFormatter={(value: number) => `$${value}`} />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="totalSales"
          stroke={STROKE_COLORS[color.name][theme || 'light']}
          strokeWidth={2}
          fill={`hsl(${cssColors['--primary']})`}
          fillOpacity={0.8}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
