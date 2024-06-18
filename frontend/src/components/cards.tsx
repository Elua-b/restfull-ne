
interface CardProps {
    title: string;
    count: number;
    icon: React.ReactNode;
  }
const Cards: React.FC<CardProps> = ({ title, count, icon }) => {
  return (
    <div className=" p-8 py-10 rounded-lg shadow-lg border-gray-700 flex items-center space-x-4 gap-3 cursor-pointer">
      <div className="p-3 bg-white rounded-md">
        {icon}
      </div>
      <div>
        <h2 className=" text-black">{title}</h2>
        <p className="text-xl text-black">{count}</p>
      </div>
    </div>
  )
}

export default Cards
