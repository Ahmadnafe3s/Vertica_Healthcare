import { chartConfig, incomeExpenseConfig } from '@/chartConfig/chartConfig'
import RectCard from '@/components/rectCard'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { currencyFormat } from '@/lib/utils'
import { Ambulance, DollarSign, HeartPulse, Pill, Radiation, TestTubeDiagonal, TrendingUp } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Area, AreaChart, Pie, PieChart, XAxis } from 'recharts'





const income_Expenses = [
    { month: "January", Expenses: 186, Income: 80 },
    { month: "February", Expenses: 305, Income: 200 },
    { month: "March", Expenses: 237, Income: 120 },
    { month: "April", Expenses: 73, Income: 190 },
    { month: "May", Expenses: 209, Income: 130 },
    { month: "June", Expenses: 214, Income: 140 },
    { month: "July", Expenses: 214, Income: 140 },
    { month: "August", Expenses: 214, Income: 140 },
]


const chartData = [
    { service: "OPD", visitors: 275, fill: "var(--color-chrome)" },
    { service: "Pharmacy", visitors: 200, fill: "var(--color-safari)" },
    { service: "Ambulace", visitors: 187, fill: "var(--color-firefox)" },
    { service: "Pathylogy", visitors: 173, fill: "var(--color-edge)" },
    { service: "Radiology", visitors: 90, fill: "var(--color-other)" },
]


const AdminDashboard = () => {



    return (

        <div className='pt-4'>

            {/* total income section */}
            <div className='grid lg:grid-cols-4 sm:grid-cols-3 gap-4'>

                <RectCard name='OPD Income' path={''} amount={200}>
                    <HeartPulse className='h-8 w-8' />
                </RectCard>

                <RectCard name='Pharmacy Income' path={''} amount={45600}>
                    <Pill  className='h-8 w-8' />
                </RectCard>

                <RectCard name='Pathylogy Income' path={''} amount={85400}>
                    <TestTubeDiagonal className='h-8 w-8' />
                </RectCard>

                <RectCard name='Radiology Income' path={''} amount={780}>
                    <Radiation  className='h-8 w-8' />
                </RectCard>

                <RectCard name='Ambulance Income' path={''} amount={6900}>
                    <Ambulance className='h-8 w-8' />
                </RectCard>

                <RectCard name='Expenses' path={''} amount={1200}>
                    <DollarSign className='h-8 w-8' />
                </RectCard>
        
            </div>




            {/* Charts section */}

            <div className='mt-10 mb-14 md:mt-16 md:mb-20'>

                <div className="grid lg:grid-cols-3 gap-5 items-center">
                    {/* Income & expenses Chart */}
                    <div className="lg:col-span-2 w-full">
                        <Card>
                            <CardHeader>
                                <CardTitle>Yearly Income & Expense</CardTitle>
                                <CardDescription>
                                    Showing total Income & Expenses for the last 12 months
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer config={incomeExpenseConfig}>
                                    <AreaChart
                                        accessibilityLayer
                                        data={income_Expenses}
                                        margin={{
                                            left: 12,
                                            right: 12,
                                        }}
                                    >
                                        <XAxis
                                            dataKey="month"
                                            tickLine={false}
                                            axisLine={false}
                                            tickMargin={8}
                                            tickFormatter={(value: string) => value.slice(0, 3)}
                                        />
                                        <ChartTooltip
                                            cursor={false}
                                            content={<ChartTooltipContent indicator="dot" />}
                                        />
                                        <Area
                                            dataKey="Expenses"
                                            type="natural"
                                            fill="var(--color-mobile)"
                                            fillOpacity={0.4}
                                            stroke="var(--color-mobile)"
                                            stackId="a"
                                        />
                                        <Area
                                            dataKey="Income"
                                            type="natural"
                                            fill="var(--color-desktop)"
                                            fillOpacity={0.4}
                                            stroke="var(--color-desktop)"
                                            stackId="a"
                                        />
                                    </AreaChart>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                    </div>

                    {/* numbers of services */}

                    <div className="lg:col-span-1">

                        <Card className="flex flex-col">
                            <CardHeader className="items-center pb-0">
                                <CardTitle>Pie Chart</CardTitle>
                                <CardDescription>January - Dec 2024</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1 pb-0">
                                <ChartContainer
                                    config={chartConfig}
                                    className="mx-auto aspect-square max-h-[250px]"
                                >
                                    <PieChart>
                                        <ChartTooltip
                                            cursor={false}
                                            content={<ChartTooltipContent hideLabel />}
                                        />
                                        <Pie data={chartData} dataKey="visitors" nameKey="service" />
                                    </PieChart>
                                </ChartContainer>
                            </CardContent>
                            <CardFooter className="flex-col gap-2 text-sm">
                                <div className="leading-none font-semibold">
                                    Showing total visitors for the last 12 months
                                </div>
                            </CardFooter>
                        </Card>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default AdminDashboard