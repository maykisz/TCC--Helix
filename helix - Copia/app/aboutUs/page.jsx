export default function AboutUsPage() {
  return (
    <main style={{ minHeight: "100vh", background: "linear-gradient(135deg, #07111f 0%, #0f172a 45%, #1e293b 100%)", color: "#f8fafc", padding: "40px 20px 80px" }}>
      <section style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gap: 24 }}>
        <a
          href="/"
          style={{
            width: "fit-content",
            textDecoration: "none",
            color: "#7dd3fc",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            fontSize: 13,
          }}
        >
          ← Voltar para Home
        </a>

        <header style={{ display: "grid", gap: 12 }}>
          <p style={{ margin: 0, color: "#7dd3fc", textTransform: "uppercase", letterSpacing: "0.18em", fontSize: 13 }}>
            Sobre nós
          </p>
          <h1 style={{ margin: 0, fontSize: "clamp(2.5rem, 8vw, 4.2rem)", lineHeight: 1.05 }}>
            Criamos soluções digitais com estratégia, tecnologia e visão de negócio.
          </h1>
          <p style={{ margin: 0, maxWidth: 760, color: "#dbe4f0", fontSize: 18, lineHeight: 1.7 }}>
            Somos uma equipe focada em transformar ideias em produtos digitais úteis, modernos e preparados para crescer.
            Atuamos em desenvolvimento web, automações, landing pages e experiências que ajudam empresas a se destacar no mercado.
          </p>
        </header>

        <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 18 }}>
          {[
            {
              title: "Missão",
              text: "Entregar experiências digitais claras, performáticas e alinhadas aos objetivos de cada cliente.",
            },
            {
              title: "Visão",
              text: "Ser referência em soluções web personalizadas, combinando design, tecnologia e resultado mensurável.",
            },
            {
              title: "Valores",
              text: "Transparência, agilidade, excelência técnica e atenção aos detalhes em cada etapa do projeto.",
            },
          ].map((item) => (
            <article
              key={item.title}
              style={{
                background: "rgba(15, 23, 42, 0.88)",
                border: "1px solid rgba(125, 211, 252, 0.18)",
                borderRadius: 24,
                padding: 22,
                boxShadow: "0 12px 30px rgba(15, 23, 42, 0.35)",
              }}
            >
              <h2 style={{ margin: "0 0 10px", fontSize: 22 }}>{item.title}</h2>
              <p style={{ margin: 0, color: "#dbe4f0", lineHeight: 1.6 }}>{item.text}</p>
            </article>
          ))}
        </section>

        <section
          style={{
            background: "rgba(15, 23, 42, 0.9)",
            border: "1px solid rgba(125, 211, 252, 0.18)",
            borderRadius: 24,
            padding: 24,
            display: "grid",
            gap: 12,
          }}
        >
          <h2 style={{ margin: 0, fontSize: 24 }}>Por que escolher a Hélix?</h2>
          <p style={{ margin: 0, color: "#dbe4f0", lineHeight: 1.7 }}>
            Trabalhamos com foco em rapidez, qualidade e comunicação clara, entregando soluções que ajudam empresas a crescer com segurança e autonomia digital.
          </p>
        </section>
      </section>
    </main>
  );
}
