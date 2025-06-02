import { Ambulance, Baby, BriefcaseMedical, Clock2, Pill, ShieldCheck, Slice } from "lucide-react";

export const features = [
    {
        title: '24 hours Service',
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores cumque omnis labore vel animi illum delectus unde. Officiis, minima omnis?',
        icon: <Clock2 />,
    },
    {
        title: 'Quality Care',
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores cumque omnis labore vel animi illum delectus unde. Officiis, minima omnis?',
        icon: <ShieldCheck />,
    },
    {
        title: 'Qualified Doctors',
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores cumque omnis labore vel animi illum delectus unde. Officiis, minima omnis?',
        icon: <BriefcaseMedical />
    },
    {
        title: 'Opening Hours',
        description: <>
            <div className="flex justify-between">
                <p>Monday - Friday</p>
                <p>9:00AM - 5:00PM</p>
            </div>
            <div className="flex justify-between">
                <p>Saturday</p>
                <p>9:00AM - 3:00PM</p>
            </div>
            <div className="flex justify-between">
                <p>Sunday</p>
                <p>Closed</p>
            </div>
        </>,
        icon: <Clock2 />,
    },
]




export const services = [
    {
        title: 'Medical Treatment',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. At voluptatibus dolor fuga! Aperiam est eum iste nulla laborum quidem exercitationem!',
        icon: <Pill className="w-8 h-8 text-rose-500" />
    },
    {
        title: 'Emergency Help',
        description: 'Our emergency services are available 24/7 with state-of-the-art facilities and expert care.',
        icon: <Ambulance className="w-8 h-8 text-rose-500" />
    },
    {
        title: 'Pediatric Care',
        description: 'Compassionate care for children with a focus on comfort and development.',
        icon: <Baby className="w-8 h-8 text-rose-500" />
    },
    {
        title: 'Surgery',
        description: 'Advanced surgical techniques and a team of experienced surgeons ensuring your safety.',
        icon: <Slice className="w-8 h-8 text-rose-500" />
    },

]