const OPERATIONS = [
    // Surgery-related operations
    { label: 'Appendectomy', value: 'Appendectomy', categoryId: 'Surgery' },
    { label: 'Cholecystectomy', value: 'Cholecystectomy', categoryId: 'Surgery' },
    { label: 'Hernia Repair', value: 'Hernia Repair', categoryId: 'Surgery' },
    { label: 'C-section', value: 'C-section', categoryId: 'Surgery' },

    // Radiology-related operations
    { label: 'X-ray', value: 'X-ray', categoryId: 'Radiology' },
    { label: 'CT Scan', value: 'CT Scan', categoryId: 'Radiology' },
    { label: 'MRI', value: 'MRI', categoryId: 'Radiology' },
    { label: 'Ultrasound', value: 'Ultrasound', categoryId: 'Radiology' },

    // Cardiology-related operations
    { label: 'Angioplasty', value: 'Angioplasty', categoryId: 'Cardiology' },
    { label: 'ECG', value: 'ECG', categoryId: 'Cardiology' },
    {
        label: 'Pacemaker Implantation',
        value: 'Pacemaker Implantation',
        categoryId: 'Cardiology',
    },
    {
        label: 'Coronary Artery Bypass',
        value: 'Coronary Artery Bypass',
        categoryId: 'Cardiology',
    },

    // Orthopedics-related operations
    {
        label: 'Joint Replacement',
        value: 'Joint Replacement',
        categoryId: 'Orthopedics',
    },
    {
        label: 'Fracture Fixation',
        value: 'Fracture Fixation',
        categoryId: 'Orthopedics',
    },
    { label: 'Arthroscopy', value: 'Arthroscopy', categoryId: 'Orthopedics' },
    {
        label: 'Spinal Surgery',
        value: 'Spinal Surgery',
        categoryId: 'Orthopedics',
    },

    // Pediatrics-related operations
    { label: 'Vaccination', value: 'Vaccination', categoryId: 'Pediatrics' },
    { label: 'Circumcision', value: 'Circumcision', categoryId: 'Pediatrics' },
    {
        label: 'Pediatric Surgery',
        value: 'Pediatric Surgery',
        categoryId: 'Pediatrics',
    },
    { label: 'Neonatal Care', value: 'Neonatal Care', categoryId: 'Pediatrics' },

    // Neurology-related operations
    {
        label: 'Brain Tumor Surgery',
        value: 'Brain Tumor Surgery',
        categoryId: 'Neurology',
    },
    {
        label: 'Spinal Cord Surgery',
        value: 'Spinal Cord Surgery',
        categoryId: 'Neurology',
    },
    {
        label: 'Deep Brain Stimulation',
        value: 'Deep Brain Stimulation',
        categoryId: 'Neurology',
    },
    {
        label: 'Neurovascular Surgery',
        value: 'Neurovascular Surgery',
        categoryId: 'Neurology',
    },

    // Plastic Surgery-related operations
    { label: 'Facelift', value: 'Facelift', categoryId: 'Plastic Surgery' },
    { label: 'Rhinoplasty', value: 'Rhinoplasty', categoryId: 'Plastic Surgery' },
    {
        label: 'Breast Augmentation',
        value: 'Breast Augmentation',
        categoryId: 'Plastic Surgery',
    },
    { label: 'Liposuction', value: 'Liposuction', categoryId: 'Plastic Surgery' },
    { label: 'Tummy Tuck', value: 'Tummy Tuck', categoryId: 'Plastic Surgery' },
];



export interface operationOptions {
    label: string,
    value: string
}




export const getOperationsOptions = (categoryId: String): operationOptions[] => {
    const selectedOptins = []

    for (let elem of OPERATIONS) {
        if (elem.categoryId === categoryId) {
            selectedOptins.push({ label: elem.label, value: elem.value })
        }
    }

    return selectedOptins
}