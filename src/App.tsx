import { FormEvent, useMemo, useState } from 'react';
import { Link, NavLink, Navigate, Route, Routes, useParams } from 'react-router-dom';
import { critiqueData, type Critique } from './data/critiqueData';
import { essayData, type Essay } from './data/essayData';
import { experimentData } from './data/experimentData';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/critiques', label: 'Critiques' },
  { to: '/essays', label: 'Essays' },
  { to: '/experiments', label: 'Experiments' },
  { to: '/ai-workshop', label: 'AI Workshop' },
];

const critiqueSections = [
  ['첫 인상', 'firstImpression'],
  ['작품 구조', 'structure'],
  ['상징 분석', 'symbolism'],
  ['몽환성 분석', 'dreaminess'],
  ['창작 적용', 'creativeApplication'],
  ['AI 분석 기록', 'aiRecord'],
] as const;

const aiPerspectives = [
  {
    id: 'symbol',
    label: '상징',
    title: '상징과 반복물',
    text: '반복되는 사물과 색채를 먼저 추적하면 작품의 숨은 압력이 드러난다. 컵, 창문, 빛 같은 요소가 감정의 방향을 대신 말하는지 살펴볼 만하다.',
  },
  {
    id: 'dream',
    label: '몽환성',
    title: '현실의 느슨한 연결',
    text: '초현실적 사건보다 장면 사이의 인과가 살짝 비어 있는 지점이 중요하다. 시간의 도약, 느린 편집, 설명되지 않는 침묵이 꿈의 감각을 만든다.',
  },
  {
    id: 'craft',
    label: '창작 적용',
    title: '다음 작업으로 옮기기',
    text: '분석을 창작 메모로 바꾸려면 장면 하나, 반복 사물 하나, 생략할 설명 하나를 정해보면 좋다. 해석은 곧바로 작은 제작 규칙이 된다.',
  },
];

function App() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <Link className="brand" to="/" aria-label="고양이 서재 공방 Home">
          <img src="/images/profile.webp" alt="안경을 쓰고 컵을 든 고양이" />
          <span>
            <strong>고양이 서재 공방</strong>
            <small>critique · poetics · experiments</small>
          </span>
        </Link>
        <nav className="top-nav" aria-label="주요 메뉴">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/critiques" element={<Critiques />} />
          <Route path="/critiques/:id" element={<CritiqueDetail />} />
          <Route path="/essays" element={<Essays />} />
          <Route path="/essays/:id" element={<EssayDetail />} />
          <Route path="/experiments" element={<Experiments />} />
          <Route path="/ai-workshop" element={<AIWorkshop />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <footer className="site-footer">
        <span>낡은 종이 위에 남기는 비평과 실험의 기록.</span>
      </footer>
    </div>
  );
}

function Home() {
  return (
    <div className="page-stack">
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">private creative atelier</p>
          <h1>밤의 서재에서 작품을 읽고, 문장을 실험하고, AI의 독법을 기록합니다.</h1>
          <p>
            이곳은 작품 비평, 시론, 실험적 인터페이스, AI 분석 로그를 차분히 쌓아두는 개인 창작 공방입니다.
            안경 쓴 고양이가 지키는 작은 책상 위에서 감상은 메모가 되고, 메모는 다음 작업의 설계도가 됩니다.
          </p>
          <div className="hero-actions">
            <Link className="primary-link" to="/critiques">
              비평 읽기
            </Link>
            <Link className="ghost-link" to="/ai-workshop">
              분석 공방
            </Link>
          </div>
        </div>
        <div className="profile-frame">
          <img src="/images/profile.webp" alt="안경을 쓰고 컵을 든 고양이 프로필" />
        </div>
      </section>

      <ContentSection title="최근 비평" lead="작품의 구조, 상징, 몽환성을 천천히 뜯어본 기록입니다.">
        <div className="card-grid three">
          {critiqueData.slice(0, 3).map((critique) => (
            <CritiqueCard key={critique.id} critique={critique} />
          ))}
        </div>
      </ContentSection>

      <ContentSection title="최근 시론" lead="감상에서 시작해 창작 방법론으로 이어지는 질문들입니다.">
        <div className="card-grid three">
          {essayData.slice(0, 3).map((essay) => (
            <EssayCard key={essay.id} essay={essay} />
          ))}
        </div>
      </ContentSection>

      <section className="portal-grid" aria-label="공방 입구">
        <Link className="portal-card" to="/experiments">
          <span className="portal-kicker">gallery</span>
          <h2>실험작 전시장</h2>
          <p>클릭형 텍스트, 이미지 감상대, UI 실험을 모아두는 작은 전시장.</p>
        </Link>
        <Link className="portal-card workshop" to="/ai-workshop">
          <span className="portal-kicker">workbench</span>
          <h2>AI 분석 공방</h2>
          <p>분석 대상을 입력하고 관점을 고르면 샘플 비평 로그가 정리됩니다.</p>
        </Link>
      </section>
    </div>
  );
}

function Critiques() {
  return (
    <div className="page-stack">
      <PageIntro
        label="Critiques"
        title="작품 비평 목록"
        description="매체, 분위기 태그, 한 줄 요약을 기준으로 비평 노트를 탐색합니다."
      />
      <div className="card-grid">
        {critiqueData.map((critique) => (
          <CritiqueCard key={critique.id} critique={critique} />
        ))}
      </div>
    </div>
  );
}

function CritiqueDetail() {
  const { id } = useParams();
  const critique = critiqueData.find((item) => item.id === id);

  if (!critique) {
    return <Navigate to="/critiques" replace />;
  }

  return (
    <article className={`detail-page critique-theme ${critique.theme}`}>
      <Link className="back-link" to="/critiques">
        비평 목록
      </Link>
      <header className="detail-hero">
        <p className="eyebrow">{critique.medium}</p>
        <h1>{critique.title}</h1>
        <p>{critique.summary}</p>
        <TagList tags={critique.moodTags} />
      </header>

      <div className="detail-sections">
        {critiqueSections.map(([label, key]) => (
          <section className="paper-panel" key={key}>
            <h2>{label}</h2>
            <p>{critique[key]}</p>
          </section>
        ))}
      </div>
    </article>
  );
}

function Essays() {
  return (
    <div className="page-stack">
      <PageIntro
        label="Essays"
        title="시론 목록"
        description="핵심 질문, 개념, 반론을 쌓아 창작 언어의 뼈대를 정리합니다."
      />
      <div className="card-grid">
        {essayData.map((essay) => (
          <EssayCard key={essay.id} essay={essay} />
        ))}
      </div>
    </div>
  );
}

function EssayDetail() {
  const { id } = useParams();
  const essay = essayData.find((item) => item.id === id);

  if (!essay) {
    return <Navigate to="/essays" replace />;
  }

  return (
    <article className="detail-page essay-detail">
      <Link className="back-link" to="/essays">
        시론 목록
      </Link>
      <header className="detail-hero">
        <p className="eyebrow">{essay.category}</p>
        <h1>{essay.title}</h1>
        <div className="meta-line">
          <span>{essay.status}</span>
          <span>{essay.keywords.join(' · ')}</span>
        </div>
      </header>

      <div className="detail-sections">
        <section className="paper-panel">
          <h2>핵심 질문</h2>
          <p>{essay.question}</p>
        </section>
        <section className="paper-panel">
          <h2>개념 정의</h2>
          <p>{essay.conceptDefinition}</p>
        </section>
        <section className="paper-panel">
          <h2>주요 논지</h2>
          <NumberedTextList items={essay.mainArguments} />
        </section>
        <section className="paper-panel">
          <h2>예시 작품</h2>
          <TagList tags={essay.exampleWorks} />
        </section>
        <section className="paper-panel">
          <h2>반론과 한계</h2>
          <p>{essay.counterLimits}</p>
        </section>
        <section className="paper-panel">
          <h2>다음 질문</h2>
          <NumberedTextList items={essay.nextQuestions} />
        </section>
      </div>
    </article>
  );
}

function Experiments() {
  return (
    <div className="page-stack">
      <PageIntro
        label="Experiments"
        title="실험작 전시장"
        description="읽기, 보기, 누르기의 방식을 바꿔보는 프로토타입 모음입니다."
      />
      <div className="experiment-grid">
        {experimentData.map((experiment) => (
          <article className="experiment-card" key={experiment.id}>
            <div>
              <span className="status-pill">{experiment.status}</span>
              <h2>{experiment.title}</h2>
              <p>{experiment.summary}</p>
            </div>
            <div className="experiment-footer">
              <span>{experiment.kind}</span>
              <p>{experiment.note}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function AIWorkshop() {
  const [target, setTarget] = useState('');
  const [selectedPerspective, setSelectedPerspective] = useState(aiPerspectives[0].id);
  const [submittedTarget, setSubmittedTarget] = useState('안개 낀 방을 배경으로 한 짧은 영상');

  const perspective = useMemo(
    () => aiPerspectives.find((item) => item.id === selectedPerspective) ?? aiPerspectives[0],
    [selectedPerspective],
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmittedTarget(target.trim() || '무제의 작품');
  }

  return (
    <div className="page-stack">
      <PageIntro
        label="AI Workshop"
        title="AI 분석 공방"
        description="실제 API 연결 전, 분석 대상과 관점에 따라 샘플 결과를 출력하는 작업대입니다."
      />
      <section className="workshop-layout">
        <form className="workbench paper-panel" onSubmit={handleSubmit}>
          <label htmlFor="analysis-target">분석 대상</label>
          <textarea
            id="analysis-target"
            value={target}
            onChange={(event) => setTarget(event.target.value)}
            placeholder="작품 제목, 장면 설명, 이미지 메모, 감상 기록을 적어주세요."
          />

          <div className="button-group" role="group" aria-label="분석 관점 선택">
            {aiPerspectives.map((item) => (
              <button
                className={item.id === selectedPerspective ? 'is-selected' : ''}
                key={item.id}
                type="button"
                onClick={() => setSelectedPerspective(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button className="primary-button" type="submit">
            샘플 분석 생성
          </button>
        </form>

        <aside className="result-panel">
          <p className="eyebrow">sample result</p>
          <h2>{perspective.title}</h2>
          <p className="target-line">분석 대상: {submittedTarget}</p>
          <p>{perspective.text}</p>
          <div className="result-note">
            <strong>기록 메모</strong>
            <span>
              지금 단계에서는 API 호출 없이 로컬 샘플 문장을 보여줍니다. 이후 같은 UI에 실제 분석 API를 연결할 수
              있습니다.
            </span>
          </div>
        </aside>
      </section>
    </div>
  );
}

function ContentSection({
  title,
  lead,
  children,
}: {
  title: string;
  lead: string;
  children: React.ReactNode;
}) {
  return (
    <section className="content-section">
      <div className="section-heading">
        <h2>{title}</h2>
        <p>{lead}</p>
      </div>
      {children}
    </section>
  );
}

function PageIntro({ label, title, description }: { label: string; title: string; description: string }) {
  return (
    <header className="page-intro">
      <p className="eyebrow">{label}</p>
      <h1>{title}</h1>
      <p>{description}</p>
    </header>
  );
}

function CritiqueCard({ critique }: { critique: Critique }) {
  return (
    <Link className={`archive-card theme-${critique.theme}`} to={`/critiques/${critique.id}`}>
      <div className="card-topline">
        <span>{critique.medium}</span>
      </div>
      <h2>{critique.title}</h2>
      <p>{critique.summary}</p>
      <TagList tags={critique.moodTags} />
    </Link>
  );
}

function EssayCard({ essay }: { essay: Essay }) {
  return (
    <Link className="archive-card essay-card" to={`/essays/${essay.id}`}>
      <div className="card-topline">
        <span>{essay.category}</span>
        <span>{essay.status}</span>
      </div>
      <h2>{essay.title}</h2>
      <p>{essay.question}</p>
      <TagList tags={essay.keywords} />
    </Link>
  );
}

function TagList({ tags }: { tags: string[] }) {
  return (
    <div className="tag-list">
      {tags.map((tag) => (
        <span key={tag}>{tag}</span>
      ))}
    </div>
  );
}

function NumberedTextList({ items }: { items: string[] }) {
  return (
    <ol className="text-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ol>
  );
}

export default App;
