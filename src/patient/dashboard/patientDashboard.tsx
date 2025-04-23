import RectCard from "@/components/rectCard"
import { PatientDashTotalCount, StatusCount, YearlyAppointments, Expenses } from "@/types/dashboard/patientDashboard"
import { CalendarClock, HandCoins, HeartPulse, Pill } from "lucide-react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { getApppointmentStatusCount, getPatientDashTotalCount, getPatientTotalExpenses, getYearlyApppointmentsReport } from "./ApiHandlers"
import { useAppSelector } from "@/hooks"
import { authSelector } from "@/features/auth/authSlice"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { chartConfig, singleLineAreaChartConfig } from "@/chartConfig/chartConfig"
import { Area, AreaChart, CartesianGrid, Label, Pie, PieChart, XAxis } from "recharts"
import { lineCharDefaultData } from "./defaultChartdata"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"



const PatientDashboard = () => {

    // session
    const { user } = useAppSelector(authSelector)

    // api states
    const [totalCount, setTotalCount] = useState<PatientDashTotalCount | null>(null)
    const [yearlyAppointments, setYearlyAppointments] = useState<YearlyAppointments[]>([])
    const [appmtStatusCount, setAppmtStatusCount] = useState<StatusCount[]>([])
    const [exp, setExpenses] = useState<Expenses>()

    // regular state
    const [year, setYear] = useState<number>(2025)


    const fetchDashboardData = async () => {
        try {
            // calling apis
            const [totalCount, appointments, statusCount, expns] = await Promise.all([
                getPatientDashTotalCount(user?.id!),
                getYearlyApppointmentsReport(user?.id!),
                getApppointmentStatusCount(user?.id!),
                getPatientTotalExpenses(user?.id!),
            ])


            // changing states
            setTotalCount(totalCount)
            setYearlyAppointments(appointments)
            setAppmtStatusCount(statusCount)
            setExpenses(expns)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    const onYearChnage = async (value: number) => {
        try {
            const data = await getYearlyApppointmentsReport(user?.id!, { year: value })
            setYearlyAppointments(data)
            setYear(value)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    useEffect(() => {
        fetchDashboardData()
    }, [])




    return (
        <section className="flex flex-col space-y-16 mt-4 mb-24">
            <div className='grid lg:grid-cols-4 sm:grid-cols-2 gap-4'>

                {/* Total Visits */}
                <RectCard name='OPD' path={'/opd'} visits={totalCount?.opds}>
                    <HeartPulse className='h-8 w-8 text-red-500' />
                </RectCard>

                <RectCard name='Appointment' path={'/appointment'} visits={totalCount?.appointments} >
                    <CalendarClock className='h-8 w-8 text-slate-500' />
                </RectCard>

                <RectCard name='Pharmacy' path={'/pharmacy'} visits={totalCount?.pharmacies}>
                    <Pill className='h-8 w-8 text-green-500' />
                </RectCard>

                <RectCard name='Expenses' path={''} amount={exp?.expenses}>
                    <HandCoins className='h-8 w-8 text-rose-500' />
                </RectCard>

            </div>



            {/* area chart */}

            <div className="grid lg:grid-cols-2 gap-5 items-center">
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <p className="text-gray-500">Search</p>
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

                        <>
                            <CardTitle>Yearly - Appointments</CardTitle>
                            <CardDescription>
                                Showing total Appointments for the 12 months
                            </CardDescription>
                        </>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={singleLineAreaChartConfig}>
                            <AreaChart
                                accessibilityLayer
                                data={yearlyAppointments.length > 1 ? yearlyAppointments : lineCharDefaultData}
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
                                    tickFormatter={(value) => value.slice(0, 3)}
                                />
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent indicator="dot" hideLabel />}
                                />
                                <Area
                                    dataKey="appointments"
                                    type="linear"
                                    fill="var(--color-desktop)"
                                    fillOpacity={0.4}
                                    stroke="var(--color-desktop)"
                                />
                            </AreaChart>
                        </ChartContainer>
                    </CardContent>
                    <CardFooter>
                        <div className="flex w-full items-start gap-2 text-sm">
                            <div className="grid gap-2">
                                <div className="flex items-center gap-2 leading-none text-muted-foreground">
                                    January - June {year}
                                </div>
                            </div>
                        </div>
                    </CardFooter>
                </Card>



                {/* pie chart */}

                <div >
                    <Card className="flex flex-col xl:w-[400px] mx-auto">
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
                                        data={appmtStatusCount}
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
                                                                {totalCount?.appointments.toLocaleString()}
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
                                Showing status total count for 12 months
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </section>
    )
}

export default PatientDashboard