import { Link } from "react-router-dom";

function Home() {
return ( <main>
<section
style={{
padding: "80px 20px",
textAlign: "center",
background:
"linear-gradient(135deg, #eef2ff, #ffffff)",
}}
>
<div
style={{
maxWidth: "900px",
margin: "0 auto",
}}
>
<p
style={{
color: "#4f46e5",
fontWeight: "700",
marginBottom: "12px",
}}
>
WELCOME TO OUR STORE </p>

```
      <h1
        style={{
          fontSize: "48px",
          lineHeight: "1.1",
          marginBottom: "20px",
        }}
      >
        Everything You Need,
        <br />
        All in One Place
      </h1>

      <p
        style={{
          fontSize: "18px",
          color: "#64748b",
          maxWidth: "650px",
          margin: "0 auto 30px",
          lineHeight: "1.7",
        }}
      >
        Discover quality products at great prices.
        Browse our collection and find something
        you love.
      </p>

      <Link
        to="/products"
        style={{
          display: "inline-block",
          padding: "14px 28px",
          background: "#4f46e5",
          color: "#ffffff",
          borderRadius: "10px",
          fontWeight: "700",
          textDecoration: "none",
        }}
      >
        Shop Now
      </Link>
    </div>
  </section>

  <section
    style={{
      padding: "60px 20px",
      maxWidth: "1100px",
      margin: "0 auto",
    }}
  >
    <h2
      style={{
        textAlign: "center",
        marginBottom: "35px",
      }}
    >
      Why Shop With Us?
    </h2>

    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "20px",
      }}
    >
      <div
        style={{
          padding: "25px",
          borderRadius: "12px",
          background: "#ffffff",
          textAlign: "center",
          boxShadow:
            "0 5px 20px rgba(0,0,0,0.06)",
        }}
      >
        <h3>Quality Products</h3>
        <p>
          Carefully selected products for our
          customers.
        </p>
      </div>

      <div
        style={{
          padding: "25px",
          borderRadius: "12px",
          background: "#ffffff",
          textAlign: "center",
          boxShadow:
            "0 5px 20px rgba(0,0,0,0.06)",
        }}
      >
        <h3>Great Prices</h3>
        <p>
          Competitive prices for everyday
          shopping.
        </p>
      </div>

      <div
        style={{
          padding: "25px",
          borderRadius: "12px",
          background: "#ffffff",
          textAlign: "center",
          boxShadow:
            "0 5px 20px rgba(0,0,0,0.06)",
        }}
      >
        <h3>Easy Shopping</h3>
        <p>
          Simple and convenient online shopping
          experience.
        </p>
      </div>
    </div>
  </section>
</main>

);
}

export default Home;
