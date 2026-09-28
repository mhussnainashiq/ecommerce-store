function Customers({ users, orders }) {
  const customers = users.filter(
    (user) => user.role !== "admin"
  );

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <span className="eyebrow">USERS</span>
          <h1>Customers</h1>
        </div>
      </div>

      <div className="table-card">
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Orders</th>
                <th>Joined</th>
              </tr>
            </thead>

            <tbody>
              {customers.length === 0 ? (
                <tr>
                  <td colSpan="4">
                    No customers registered yet.
                  </td>
                </tr>
              ) : (
                customers.map((customer) => {
                  const count = orders.filter(
                    (order) =>
                      order.customer?.email?.toLowerCase() ===
                      customer.email.toLowerCase()
                  ).length;

                  return (
                    <tr key={customer.id}>
                      <td>{customer.name}</td>

                      <td>{customer.email}</td>

                      <td>{count}</td>

                      <td>
                        {customer.createdAt || "-"}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Customers;