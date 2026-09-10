export function AboutSection() {
  return (
    <div style={{ maxWidth: '60ch' }}>
      <p style={{ marginBottom: '1.25rem', fontSize: '1.05rem', lineHeight: 1.7 }}>
        At JadeQuest Consulting, I work on Hyperledger Fabric and
        cross-chain bridging, enterprise systems that need to talk to
        public chains without losing the guarantees either side depends
        on. Outside of that, I build on both SVM and EVM because I like
        working across the two, not because one's better, they're
        different enough that switching between them keeps things
        interesting.
      </p>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
        Solidity, Rust/Anchor, and Fabric chaincode, plus whatever a
        project actually needs around them. Selected as a Martian in the
        BNB Chain Program. Based in Vadodara, India.
      </p>
    </div>
  );
}
