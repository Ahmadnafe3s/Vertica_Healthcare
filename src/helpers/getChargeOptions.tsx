
export const CHARGE_TYPES = [
  { TID: 'Consultation Fee', label: 'Consultation Fee', value: 'Consultation Fee' },
  { TID: 'Diagnostic Fee', label: 'Diagnostic Fee', value: 'Diagnostic Fee' },
  { TID: 'Surgery Fee', label: 'Surgery Fee', value: 'Surgery Fee' },
  { TID: 'Ultrasound', label: 'Ultrasound', value: 'Ultrasound' },
  { TID: 'ECG', label: 'ECG', value: 'ECG' },
  { TID: 'Anesthesia Fee', label: 'Anesthesia Fee', value: 'Anesthesia Fee' },
  { TID: 'Blood Test', label: 'Blood Test', value: 'Blood Test' },
  { TID: 'Emergency Fee', label: 'Emergency Fee', value: 'Emergency Fee' },
  { TID: 'ICU Charges', label: 'ICU Charges', value: 'ICU Charges' },
];





const CHARGE_CATEGORIES = [
  // Consultation Category
  { TID: 'Consultation Fee', CID: 'Initial Consultation', label: 'Initial Consultation', value: 'Initial Consultation' },
  { TID: 'Consultation Fee', CID: 'Follow-up Consultation', label: 'Follow-up Consultation', value: 'Follow-up Consultation' },
  { TID: 'Consultation Fee', CID: 'Specialist Consultation', label: 'Specialist Consultation', value: 'Specialist Consultation' },

  // Diagnostic Category
  { TID: 'Diagnostic Fee', CID: 'Blood Test', label: 'Blood Test', value: 'Blood Test' },
  { TID: 'Diagnostic Fee', CID: 'Urine Test', label: 'Urine Test', value: 'Urine Test' },
  { TID: 'Diagnostic Fee', CID: 'X-Ray', label: 'X-Ray', value: 'X-Ray' },
  { TID: 'Diagnostic Fee', CID: 'CT Scan', label: 'CT Scan', value: 'CT Scan' },
  { TID: 'Diagnostic Fee', CID: 'MRI', label: 'MRI', value: 'MRI' },
  { TID: 'Diagnostic Fee', CID: 'ECG Test', label: 'ECG Test', value: 'ECG Test' },

  // Surgery Category
  { TID: 'Surgery Fee', CID: 'Minor Surgery', label: 'Minor Surgery', value: 'Minor Surgery' },
  { TID: 'Surgery Fee', CID: 'Major Surgery', label: 'Major Surgery', value: 'Major Surgery' },
  { TID: 'Surgery Fee', CID: 'Emergency Surgery', label: 'Emergency Surgery', value: 'Emergency Surgery' },

  // X-Ray Category
  { TID: 'X-Ray', CID: 'Chest X-Ray', label: 'Chest X-Ray', value: 'Chest X-Ray' },
  { TID: 'X-Ray', CID: 'Abdominal X-Ray', label: 'Abdominal X-Ray', value: 'Abdominal X-Ray' },

  // Ultrasound Category
  { TID: 'Ultrasound', CID: 'Abdominal Ultrasound', label: 'Abdominal Ultrasound', value: 'Abdominal Ultrasound' },
  { TID: 'Ultrasound', CID: 'Pelvic Ultrasound', label: 'Pelvic Ultrasound', value: 'Pelvic Ultrasound' },
  { TID: 'Ultrasound', CID: 'Cardiac Ultrasound', label: 'Cardiac Ultrasound', value: 'Cardiac Ultrasound' },

  // ECG Category
  { TID: 'ECG', CID: 'Resting ECG', label: 'Resting ECG', value: 'Resting ECG' },
  { TID: 'ECG', CID: 'Stress ECG', label: 'Stress ECG', value: 'Stress ECG' },

  // Anesthesia Category
  { TID: 'Anesthesia Fee', CID: 'General Anesthesia', label: 'General Anesthesia', value: 'General Anesthesia' },
  { TID: 'Anesthesia Fee', CID: 'Local Anesthesia', label: 'Local Anesthesia', value: 'Local Anesthesia' },
  { TID: 'Anesthesia Fee', CID: 'Regional Anesthesia', label: 'Regional Anesthesia', value: 'Regional Anesthesia' },

  // Blood Test Category
  { TID: 'Blood Test', CID: 'CBC Test', label: 'CBC Test', value: 'CBC Test' },
  { TID: 'Blood Test', CID: 'Blood Sugar Test', label: 'Blood Sugar Test', value: 'Blood Sugar Test' },
  { TID: 'Blood Test', CID: 'Liver Function Test', label: 'Liver Function Test', value: 'Liver Function Test' },

  // Emergency Category
  { TID: 'Emergency Fee', CID: 'Emergency Consultation', label: 'Emergency Consultation', value: 'Emergency Consultation' },
  { TID: 'Emergency Fee', CID: 'Emergency Room Charges', label: 'Emergency Room Charges', value: 'Emergency Room Charges' },

  // ICU Category
  { TID: 'ICU Charges', CID: 'ICU Bed Charges', label: 'ICU Bed Charges', value: 'ICU Bed Charges' },
  { TID: 'ICU Charges', CID: 'ICU Monitoring', label: 'ICU Monitoring', value: 'ICU Monitoring' },
];






const CHARGE_NAMES = [
  // Initial Consultation Category
  { NID: 'General Consultation', CID: 'Initial Consultation', label: 'General Consultation', value: 'General Consultation' },
  { NID: 'Specialist Consultation', CID: 'Specialist Consultation', label: 'Specialist Consultation', value: 'Specialist Consultation' },

  // Follow-up Consultation Category
  { NID: 'Follow-up Consultation', CID: 'Follow-up Consultation', label: 'Follow-up Consultation', value: 'Follow-up Consultation' },

  // Specialist Consultation Category
  { NID: 'Cardiology Consultation', CID: 'Specialist Consultation', label: 'Cardiology Consultation', value: 'Cardiology Consultation' },
  { NID: 'Neurology Consultation', CID: 'Specialist Consultation', label: 'Neurology Consultation', value: 'Neurology Consultation' },

  // Blood Test Category
  { NID: 'Complete Blood Count (CBC)', CID: 'Blood Test', label: 'Complete Blood Count (CBC)', value: 'Complete Blood Count (CBC)' },
  { NID: 'Blood Sugar Test', CID: 'Blood Test', label: 'Blood Sugar Test', value: 'Blood Sugar Test' },
  { NID: 'Liver Function Test', CID: 'Blood Test', label: 'Liver Function Test', value: 'Liver Function Test' },

  // Urine Test Category
  { NID: 'Urine Routine', CID: 'Urine Test', label: 'Urine Routine', value: 'Urine Routine' },
  { NID: 'Urine Culture', CID: 'Urine Test', label: 'Urine Culture', value: 'Urine Culture' },

  // X-Ray Diagnostic Category
  { NID: 'X-Ray Chest', CID: 'X-Ray', label: 'X-Ray Chest', value: 'X-Ray Chest' },
  { NID: 'X-Ray Abdomen', CID: 'X-Ray', label: 'X-Ray Abdomen', value: 'X-Ray Abdomen' },

  // CT Scan Category
  { NID: 'CT Scan Abdomen', CID: 'CT Scan', label: 'CT Scan Abdomen', value: 'CT Scan Abdomen' },
  { NID: 'CT Scan Chest', CID: 'CT Scan', label: 'CT Scan Chest', value: 'CT Scan Chest' },
  { NID: 'CT Scan Brain', CID: 'CT Scan', label: 'CT Scan Brain', value: 'CT Scan Brain' },

  // MRI Category
  { NID: 'MRI Brain', CID: 'MRI', label: 'MRI Brain', value: 'MRI Brain' },
  { NID: 'MRI Spine', CID: 'MRI', label: 'MRI Spine', value: 'MRI Spine' },

  // ECG Test Category
  { NID: 'Resting ECG', CID: 'ECG Test', label: 'Resting ECG', value: 'Resting ECG' },
  { NID: 'Stress ECG', CID: 'ECG Test', label: 'Stress ECG', value: 'Stress ECG' },

  // Emergency Consultation Category
  { NID: 'Emergency Consultation (Doctor)', CID: 'Emergency Consultation', label: 'Emergency Consultation (Doctor)', value: 'Emergency Consultation (Doctor)' },

  // ICU Bed Charges Category
  { NID: 'ICU Bed Charges (Day)', CID: 'ICU Bed Charges', label: 'ICU Bed Charges (Day)', value: 'ICU Bed Charges (Day)' },
  { NID: 'ICU Bed Charges (Night)', CID: 'ICU Bed Charges', label: 'ICU Bed Charges (Night)', value: 'ICU Bed Charges (Night)' },

  // ICU Monitoring Category
  { NID: 'ICU Monitoring Charges', CID: 'ICU Monitoring', label: 'ICU Monitoring Charges', value: 'ICU Monitoring Charges' },

  // Minor Surgery Category
  { NID: 'Minor Surgery (e.g., wound suturing)', CID: 'Minor Surgery', label: 'Minor Surgery (e.g., wound suturing)', value: 'Minor Surgery (e.g., wound suturing)' },
  { NID: 'Minor Surgery (e.g., abscess drainage)', CID: 'Minor Surgery', label: 'Minor Surgery (e.g., abscess drainage)', value: 'Minor Surgery (e.g., abscess drainage)' },

  // Major Surgery Category
  { NID: 'Major Surgery (e.g., appendectomy)', CID: 'Major Surgery', label: 'Major Surgery (e.g., appendectomy)', value: 'Major Surgery (e.g., appendectomy)' },
  { NID: 'Major Surgery (e.g., gallbladder removal)', CID: 'Major Surgery', label: 'Major Surgery (e.g., gallbladder removal)', value: 'Major Surgery (e.g., gallbladder removal)' },

  // Emergency Surgery Category
  { NID: 'Emergency Surgery (e.g., trauma surgery)', CID: 'Emergency Surgery', label: 'Emergency Surgery (e.g., trauma surgery)', value: 'Emergency Surgery (e.g., trauma surgery)' },

  // Regional Anesthesia Category
  { NID: 'Spinal Anesthesia', CID: 'Regional Anesthesia', label: 'Spinal Anesthesia', value: 'Spinal Anesthesia' },
  { NID: 'Epidural Anesthesia', CID: 'Regional Anesthesia', label: 'Epidural Anesthesia', value: 'Epidural Anesthesia' },

  // General Anesthesia Category
  { NID: 'General Anesthesia (for surgeries)', CID: 'General Anesthesia', label: 'General Anesthesia (for surgeries)', value: 'General Anesthesia (for surgeries)' },

  // Local Anesthesia Category
  { NID: 'Local Anesthesia (for minor procedures)', CID: 'Local Anesthesia', label: 'Local Anesthesia (for minor procedures)', value: 'Local Anesthesia (for minor procedures)' },

  // Abdominal Ultrasound Category
  { NID: 'Abdominal Ultrasound', CID: 'Abdominal Ultrasound', label: 'Abdominal Ultrasound', value: 'Abdominal Ultrasound' },

  // Pelvic Ultrasound Category
  { NID: 'Pelvic Ultrasound', CID: 'Pelvic Ultrasound', label: 'Pelvic Ultrasound', value: 'Pelvic Ultrasound' },

  // Cardiac Ultrasound Category
  { NID: 'Cardiac Ultrasound (Echo)', CID: 'Cardiac Ultrasound', label: 'Cardiac Ultrasound (Echo)', value: 'Cardiac Ultrasound (Echo)' },

  // Emergency Room Charges Category
  { NID: 'Emergency Room Charges (Basic)', CID: 'Emergency Room Charges', label: 'Emergency Room Charges (Basic)', value: 'Emergency Room Charges (Basic)' },
  { NID: 'Emergency Room Charges (Advanced)', CID: 'Emergency Room Charges', label: 'Emergency Room Charges (Advanced)', value: 'Emergency Room Charges (Advanced)' },
];






const CHARGE_DETAILS = [
  // Initial Consultation
  { NID: 'General Consultation', amount: 500, tpa: 150 },
  { NID: 'Specialist Consultation', amount: 800, tpa: 0 },
  { NID: 'Follow-up Consultation', amount: 300, tpa: 150 },

  // Specialist Consultation
  { NID: 'Cardiology Consultation', amount: 1000, tpa: 0 },
  { NID: 'Neurology Consultation', amount: 1200, tpa: 175 },

  // Blood Test
  { NID: 'Complete Blood Count (CBC)', amount: 150, tpa: 150 },
  { NID: 'Blood Sugar Test', amount: 100, tpa: 0 },
  { NID: 'Liver Function Test', amount: 400, tpa: 125 },

  // Urine Test
  { NID: 'Urine Routine', amount: 120, tpa: 0 },
  { NID: 'Urine Culture', amount: 200, tpa: 175 },

  // X-Ray Diagnostic
  { NID: 'X-Ray Chest', amount: 500, tpa: 0 },
  { NID: 'X-Ray Abdomen', amount: 550, tpa: 175 },

  // CT Scan
  { NID: 'CT Scan Abdomen', amount: 3000, tpa: 0 },
  { NID: 'CT Scan Chest', amount: 3500, tpa: 175 },
  { NID: 'CT Scan Brain', amount: 4000, tpa: 0 },

  // MRI
  { NID: 'MRI Brain', amount: 7000, tpa: 0 },
  { NID: 'MRI Spine', amount: 8000, tpa: 150 },

  // ECG Test
  { NID: 'Resting ECG', amount: 250, tpa: 0 },
  { NID: 'Stress ECG', amount: 400, tpa: 0 },

  // Emergency Consultation
  { NID: 'Emergency Consultation (Doctor)', amount: 1500, tpa: 0 },

  // ICU Bed Charges
  { NID: 'ICU Bed Charges (Day)', amount: 5000, tpa: 150 },
  { NID: 'ICU Bed Charges (Night)', amount: 6000, tpa: 0 },

  // ICU Monitoring
  { NID: 'ICU Monitoring Charges', amount: 2000, tpa: 175 },

  // Minor Surgery
  { NID: 'Minor Surgery (e.g., wound suturing)', amount: 1500, tpa: 150 },
  { NID: 'Minor Surgery (e.g., abscess drainage)', amount: 1800, tpa: 0 },

  // Major Surgery
  { NID: 'Major Surgery (e.g., appendectomy)', amount: 12000, tpa: 0 },
  { NID: 'Major Surgery (e.g., gallbladder removal)', amount: 15000, tpa: 175 },

  // Anesthesia
  { NID: 'Spinal Anesthesia', amount: 5000, tpa: 150 },
  { NID: 'Epidural Anesthesia', amount: 6000, tpa: 0 },

  // Ultrasound
  { NID: 'Abdominal Ultrasound', amount: 1200, tpa: 100 },
  { NID: 'Pelvic Ultrasound', amount: 1300, tpa: 50 },
  { NID: 'Cardiac Ultrasound (Echo)', amount: 2500, tpa: 200 },

  // Emergency Room Charges
  { NID: 'Emergency Room Charges (Basic)', amount: 5000, tpa: 300 },
  { NID: 'Emergency Room Charges (Advanced)', amount: 8000, tpa: 450 },
];






// Step 1: Define the structure of each charge item
type returnItems = {
  label: string;
  value: string;
};



// HANDLERS



// Providing charge categories based upon types

export const getChargeCategories = (TID: string): returnItems[] => {

  let chargeCategories: any = []

  CHARGE_CATEGORIES.forEach((item) => {
    if (item.TID === TID) {
      chargeCategories.push({ label: item.label, value: item.value })
    }
  })

  return chargeCategories

}




// providing charge names with fees

export const getChargeNames = (CID: string): returnItems[] => {

  let chargeNames: returnItems[] = []

  CHARGE_NAMES.forEach((item) => {
    if (item.CID === CID) {
      chargeNames.push({ label: item.label, value: item.value })
    }
  })

  return chargeNames

}


// providing charge details

export const getChargeAmount = (NID: string) => {
  const details = CHARGE_DETAILS.find(item => item.NID === NID)
  return details
}