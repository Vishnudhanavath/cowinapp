import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'
import './index.css'

const VaccinationByAge = props => {
  const {VaccinationAge} = props
  console.log(VaccinationAge)
  return (
    <div className="chart-bg">
      <h1>Vaccination by Age</h1>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            cx="70%"
            cy="40%"
            data={VaccinationAge}
            startAngle={0}
            endAngle={360}
            //   innerRadius="40%"
            outerRadius="80%"
            dataKey="count"
          >
            <Cell name="18-44" fill="#fecba6" />
            <Cell name="45-60" fill="#b3d23f" />
            <Cell name="Above 60" fill="#a44c9e" />
          </Pie>
          <Legend
            iconType="circle"
            layout="horizontal"
            verticalAlign="middle"
            align="center"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationByAge
