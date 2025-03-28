import CreateRadiologyBill from "./createRadiologyBill"


const RadiologyBills = () => {
  return (
    <>
      <div>RadiologyBills</div>
      <CreateRadiologyBill Submit={() => { console.log() }} isPending={false} />
    </>
  )
}

export default RadiologyBills