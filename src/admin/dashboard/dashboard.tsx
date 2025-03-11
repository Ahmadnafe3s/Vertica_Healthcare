import { chartConfig, incomeExpenseConfig } from '@/chartConfig/chartConfig'
import RectCard from '@/components/rectCard'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Ambulance, CalendarClock, DollarSign, HeartPulse, Pill, Radiation, TestTubeDiagonal } from 'lucide-react'
import toast from 'react-hot-toast'
import { Area, AreaChart, CartesianGrid, Pie, PieChart, XAxis } from 'recharts'
import { useEffect, useState } from 'react'
import { AdminDash_MM_IncExp, AdminDashIncExp, AdminDashVisitors } from '@/types/dashboard/adminDashboard'
import { getAdminDash_MM_IncExp, getAdminDashIncExp, getAdminDashVisitors } from './apiHandler'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Default_MM_Inc_Exp_Data } from './defaultChartdata'
import StaffCalendar from '@/components/staffCalendar'




const AdminDashboard = () => {

    // Api states
    const [IncExp, setIncExp] = useState<AdminDashIncExp>()
    const [MonthlyIncExp, setMonthlyIncExp] = useState<AdminDash_MM_IncExp[]>([])
    const [visitors, setVisitors] = useState<AdminDashVisitors[]>([])

    const fetchAdminDashStats = async () => {
        try {
            const [inc_exp, monthly_inc_exp, visitors] = await Promise.all([
                getAdminDashIncExp(),
                getAdminDash_MM_IncExp(),
                getAdminDashVisitors() // start woking from here
            ])
            // states
            setIncExp(inc_exp)
            setMonthlyIncExp(monthly_inc_exp)
            setVisitors(visitors)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }



    const onYearChnage = async (value: number) => {
        try {
            const data = await getAdminDash_MM_IncExp(value)
            setMonthlyIncExp(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }



    useEffect(() => {
        fetchAdminDashStats()
    }, [])

    return (

        <div className='pt-4'>

            {/* total income section */}
            <div className='grid lg:grid-cols-4 sm:grid-cols-2 gap-4'>

                <RectCard name='OPD Income' path={''} amount={IncExp?.opdIncome!}>
                    <HeartPulse className='h-8 w-8 text-red-500' />
                </RectCard>

                <RectCard name='Appointment Income' path={''} amount={IncExp?.appointmentIncome!}>
                    <CalendarClock className='h-8 w-8 text-slate-500' />
                </RectCard>

                <RectCard name='Pharmacy Income' path={''} amount={IncExp?.pharmacyIncome!}>
                    <Pill className='h-8 w-8 text-green-500' />
                </RectCard>

                <RectCard name='Pathylogy Income' path={''} amount={45600}>
                    <TestTubeDiagonal className='h-8 w-8 text-blue-500' />
                </RectCard>

                <RectCard name='Radiology Income' path={''} amount={780}>
                    <Radiation className='h-8 w-8 text-yellow-500' />
                </RectCard>

                <RectCard name='Ambulance Income' path={''} amount={6900}>
                    <Ambulance className='h-8 w-8 text-violet-500' />
                </RectCard>

                <RectCard name='Expenses' path={''} amount={IncExp?.expenses!}>
                    <DollarSign className='h-8 w-8 text-rose-500 ' />
                </RectCard>

            </div>




            {/* Charts section */}

            <div className='mt-10 mb-14 md:mt-16 md:mb-20'>

                <div className="grid lg:grid-cols-3 gap-5 items-center">
                    {/* Montly Income & expenses Chart */}
                    <div className="lg:col-span-2 w-full">
                        <Card  >
                            <CardHeader>

                                <div className="flex justify-between items-center mb-2">
                                    <p className='text-gray-500'>Search</p>
                                    <div className="w-40">
                                        <Select onValueChange={(v) => onYearChnage(Number(v))}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value={String(new Date().getFullYear())}>{new Date().getFullYear()}</SelectItem>
                                                <SelectItem value={String(new Date().getFullYear() - 1)}>{new Date().getFullYear() - 1}</SelectItem>
                                                <SelectItem value={String(new Date().getFullYear() - 2)}>{new Date().getFullYear() - 2}</SelectItem>
                                                <SelectItem value={String(new Date().getFullYear() - 3)}>{new Date().getFullYear() - 3}</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <CardTitle>Monthly Income & Expense</CardTitle>
                                <CardDescription>
                                    Showing total Income & Expenses for the 12 months
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer config={incomeExpenseConfig}>
                                    <AreaChart
                                        accessibilityLayer
                                        data={MonthlyIncExp.length > 1 ? MonthlyIncExp : Default_MM_Inc_Exp_Data}
                                        margin={{
                                            left: 12,
                                            right: 12,
                                        }}
                                    >
                                        <CartesianGrid
                                            vertical
                                            stroke="#e0e0e0" // Change color of grid lines
                                            strokeDasharray="5 5" // Optional: Customize dash pattern

                                        />
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
                                {MonthlyIncExp.length < 1 && <p className='text-red-600 italic'>No data found</p>}
                            </CardContent>
                            <CardFooter className='space-x-2'>
                                <p className='text-sm text-gray-500'>Income & Expenses From</p>
                                <p className='text-sm font-semibold text-gray-500'>January - Dec</p>
                            </CardFooter>
                        </Card>
                    </div>

                    {/* numbers of services */}

                    <div className="lg:col-span-1">

                        <Card className="flex flex-col">
                            <CardHeader className="items-center pb-0">
                                <CardTitle>Pie Chart</CardTitle>
                                <CardDescription>January - Dec {new Date().getFullYear()}</CardDescription>
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
                                        <Pie data={visitors} dataKey="visitors" nameKey="service" />
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