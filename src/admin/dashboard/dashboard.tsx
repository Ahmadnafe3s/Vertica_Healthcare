import { chartConfig, incomeExpenseConfig } from '@/chartConfig/chartConfig'
import PermissionProtectedAction from '@/components/permission-protected-actions'
import RectCard from '@/components/rectCard'
import StaffCalendar from '@/components/staffCalendar'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { AdminDash_MM_IncExp, AdminDashAppmtReport, AdminDashTotalCount, AdminDashVisitors } from '@/types/dashboard/adminDashboard'
import { Activity, CalendarClock, DollarSign, HandCoins, HeartPulse, Package, Pill, Radiation, ReceiptText, ShoppingCart, TestTube2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Area, AreaChart, CartesianGrid, Label, Pie, PieChart, XAxis } from 'recharts'
import { getAdminDash_MM_IncExp, getAdminDashAppointmentReport, getAdminDashIncExp, getAdminDashVisitors } from './apiHandler'
import { Default_MM_Inc_Exp_Data } from './defaultChartdata'




const AdminDashboard = () => {


    // Api states
    const [total, setTotalCount] = useState<AdminDashTotalCount>()
    const [MonthlyIncExp, setMonthlyIncExp] = useState<AdminDash_MM_IncExp[]>([])
    const [visitors, setVisitors] = useState<AdminDashVisitors[]>([])
    const [appmtReport, setAppmtReport] = useState<AdminDashAppmtReport>()


    const fetchAdminDashStats = async () => {
        try {
            const [total, monthly_inc_exp, visitors, appmtReport] = await Promise.all([
                getAdminDashIncExp(),
                getAdminDash_MM_IncExp(),
                getAdminDashVisitors(), // start woking from here
                getAdminDashAppointmentReport()
            ])
            // states
            setTotalCount(total)
            setMonthlyIncExp(monthly_inc_exp)
            setVisitors(visitors)
            setAppmtReport(appmtReport)

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

        <div className='pt-4 pb-20'>

            {/* total income section */}
            <div className='grid lg:grid-cols-4 sm:grid-cols-2 gap-4'>

                {/* opd income */}
                <PermissionProtectedAction action='opd_income' module='dashboard'>
                    <RectCard name='OPD Income' path={'../opd'} amount={total?.opdIncome ?? 0}>
                        <HeartPulse className='h-8 w-8 text-red-500' />
                    </RectCard>
                </PermissionProtectedAction>

                {/* opds */}
                <PermissionProtectedAction action='opds' module='dashboard'>
                    <RectCard name='Total OPDs' path={'../opd'} visits={total?.opds ?? 0}>
                        <Activity className='h-8 w-8 text-amber-500' />
                    </RectCard>
                </PermissionProtectedAction>

                {/* appmnt income */}
                <PermissionProtectedAction action='appmnt_income' module='dashboard'>
                    <RectCard name='Appointment Income' path={'../appointment'} amount={total?.appointmentIncome ?? 0}>
                        <CalendarClock className='h-8 w-8 text-slate-500' />
                    </RectCard>
                </PermissionProtectedAction>

                {/* pharmacy income */}
                <PermissionProtectedAction action='pharmacy_income' module='dashboard'>
                    <RectCard name='Pharmacy Income' path={'../pharmacy'} amount={total?.pharmacyIncome ?? 0}>
                        <Pill className='h-8 w-8 text-green-500' />
                    </RectCard>
                </PermissionProtectedAction>

                {/* pharmacy bills */}
                <PermissionProtectedAction action='pharmacy_bills' module='dashboard'>
                    <RectCard name='Pharmacy Bills' path={'../pharmacy'} visits={total?.pharmacyBills ?? 0}>
                        <ReceiptText className='h-8 w-8 text-blue-500' />
                    </RectCard>
                </PermissionProtectedAction>

                {/* medicines */}
                <PermissionProtectedAction action='medicines' module='dashboard'>
                    <RectCard name='Total Medicines' path={'../pharmacy/medicines'} visits={total?.medicines ?? 0}>
                        <Package className='h-8 w-8 text-teal-500' />
                    </RectCard>
                </PermissionProtectedAction>

                {/* pharmacy expenses */}
                <PermissionProtectedAction action='pharmacy_expenses' module='dashboard'>
                    <RectCard name='Pharmacy Expenses' path={'../pharmacy'} amount={total?.pharmacyExpenses ?? 0}>
                        <HandCoins className='h-8 w-8 text-yellow-500' />
                    </RectCard>
                </PermissionProtectedAction>

                {/* medicine purchases */}
                <PermissionProtectedAction action='medicine_purchases' module='dashboard'>
                    <RectCard name='Medicine Purchases' path={'../pharmacy/medicines'} visits={total?.purchases ?? 0}>
                        <ShoppingCart className='h-8 w-8 text-violet-500' />
                    </RectCard>
                </PermissionProtectedAction>

                {/* radiology income */}
                <PermissionProtectedAction action='radiology_income' module='dashboard'>
                    <RectCard name='Radiology Income' path={'../radiology'} amount={total?.radiologyIncome ?? 0}>
                        <Radiation className='h-8 w-8 text-yellow-500' />
                    </RectCard>
                </PermissionProtectedAction>

                {/* radiology bills */}
                <PermissionProtectedAction action='radiology_bills' module='dashboard'>
                    <RectCard name='Radiology Bills' path={'../radiology'} visits={total?.radiologyBills ?? 0}>
                        <ReceiptText className='h-8 w-8 text-rose-500' />
                    </RectCard>
                </PermissionProtectedAction>

                {/* pathology income */}
                <PermissionProtectedAction action='pathology_income' module='dashboard'>
                    <RectCard name='Pathology Income' path={'../pathology'} amount={total?.pathologyIncome ?? 0}>
                        <TestTube2 className='h-8 w-8 text-gray-500' />
                    </RectCard>
                </PermissionProtectedAction>

                {/* pathology bills */}
                <PermissionProtectedAction action='pathology_bills' module='dashboard'>
                    <RectCard name='Pathology Bills' path={'../pathology'} visits={total?.pathologyBills ?? 0}>
                        <ReceiptText className='h-8 w-8 text-violet-500' />
                    </RectCard>
                </PermissionProtectedAction>

                {/* expenses */}
                <PermissionProtectedAction action='expenses' module='dashboard'>
                    <RectCard name='Expenses' path={'../expenses'} amount={total?.expenses! ?? 0}>
                        <DollarSign className='h-8 w-8 text-pink-500' />
                    </RectCard>
                </PermissionProtectedAction>

            </div>



            {/* Charts section */}

            <div className='mt-10 mb-14 md:mt-16 md:mb-20'>

                <div className="grid lg:grid-cols-3 gap-3 items-center">
                    {/* Montly Income & expenses Chart */}
                    <PermissionProtectedAction action='income_expenses' module='dashboard'>
                        <div className="w-full">
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
                    </PermissionProtectedAction>


                    {/* pie chart 1 */}

                    <PermissionProtectedAction action='appointments' module='dashboard'>
                        <div >
                            <Card className="flex flex-col mx-auto">
                                <CardHeader className="items-center pb-0">
                                    <CardTitle>Appointments - Status</CardTitle>
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
                                            <Pie
                                                data={appmtReport?.status}
                                                dataKey="count"
                                                nameKey="status"
                                                innerRadius={60}
                                                strokeWidth={5}
                                            >
                                                <Label
                                                    content={({ viewBox }) => {
                                                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                                            return (
                                                                <text
                                                                    x={viewBox.cx}
                                                                    y={viewBox.cy}
                                                                    textAnchor="middle"
                                                                    dominantBaseline="middle"
                                                                >
                                                                    <tspan
                                                                        x={viewBox.cx}
                                                                        y={viewBox.cy}
                                                                        className="fill-foreground text-3xl font-bold"
                                                                    >
                                                                        {appmtReport?.totalAppmts?.toLocaleString()}
                                                                    </tspan>
                                                                    <tspan
                                                                        x={viewBox.cx}
                                                                        y={(viewBox.cy || 0) + 24}
                                                                        className="fill-muted-foreground"
                                                                    >
                                                                        Appointments
                                                                    </tspan>
                                                                </text>
                                                            )
                                                        }
                                                    }}
                                                />
                                            </Pie>
                                        </PieChart>
                                    </ChartContainer>
                                </CardContent>
                                <CardFooter className="flex-col gap-2 text-sm">
                                    <div className="leading-none text-muted-foreground">
                                        Showing Appointment Report for 12 months
                                    </div>
                                </CardFooter>
                            </Card>
                        </div>
                    </PermissionProtectedAction>



                    {/* numbers of services */}

                    <PermissionProtectedAction action='visitors' module='dashboard'>
                        <div className="lg:col-span-1">

                            <Card className="flex flex-col mx-auto">
                                <CardHeader className="items-center pb-0">
                                    <CardTitle>Visitors Chart</CardTitle>
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
                                    <div className="leading-none text-muted-foreground">
                                        Showing Total Visitors for 12 months
                                    </div>
                                </CardFooter>
                            </Card>

                        </div>
                    </PermissionProtectedAction>
                </div>
            </div>

            {/* Calendar */}

            <StaffCalendar />

        </div>
    )
}

export default AdminDashboard