// src/components/CustomerList.jsx
export default function CustomerList({ customers, selectedCustomer, onSelectCustomer }) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Customers</h2>
      <ul>
        {customers.map((c) => (
          <li
            key={c.id}
            onClick={() => onSelectCustomer(c)}
            className={`p-2 rounded cursor-pointer mb-1 ${
              selectedCustomer?.id === c.id ? "bg-green-100 font-semibold" : "hover:bg-gray-100"
            }`}
          >
            {c.customer_code} - {c.first_names} {c.last_name} - Credit: {c.credit_score}
          </li>
        ))}
      </ul>
    </div>
  );
}
