import { useMemo, useState, type FormEvent, type ReactNode } from 'react';
import { Link, NavLink, Navigate, Route, Routes, useParams } from 'react-router-dom';
import { critiqueData, type Critique } from './data/critiqueData';
import { effectData } from './data/effectData';
import { essayData, type Essay } from './data/essayData';
import { experimentData } from './data/experimentData';
import { analysisModels, dreamTypes, theoryTerms } from './data/theoryData';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/dreamlike-theory', label: 'Dreamlike Theory' },
  { to: '/critiques', label: 'Critique Archive' },
  { to: '/essays', label: 'Essays' },
  { to: '/experiments', label: 'Experiment Lab' },
  { to: '/ai-workshop', label: 'AI Workshop' },
  { to: '/effect-library', label: 'Effect Library' },
];

const critiqueSections = [
  ['01', '첫 인상', 'firstImpression'],
  ['02', '작품 구조', 'structure'],
  ['03', '상징 분석', 'symbolism'],
  ['04', '몽환성 분석', 'dreaminess'],
  ['05', '창작 적용', 'creativeApplication'],
  ['06', 'AI 분석 기록', 'aiRecord'],
] as const;

const aiPerspectives = [
  {
    id: 'symbol',
    label: '상징 분석',
    title: '상징과 반복물',
    text: '반복되는 사물과 색채를 먼저 추적하면 작품의 숨은 압력이 드러난다. 컵, 창문, 빛 같은 요소가 감정의 방향을 대신 말하는지 살펴볼 만하다.',
  },
  {
    id: 'dream',
    label: '몽환성 유형',
    title: '현실의 느슨한 연결',
    text: '초현실적 사건보다 장면 사이의 인과가 살짝 비어 있는 지점이 중요하다. 시간의 도약, 느린 편집, 설명되지 않는 침묵이 꿈의 감각을 만든다.',
  },
  {
    id: 'craft',
    label: '창작 적용',
    title: '다음 작업으로 옮기기',
    text: '분석을 창작 메모로 바꾸려면 장면 하나, 반복 사물 하나, 생략할 설명 하나를 정해보면 좋다. 해석은 곧바로 작은 제작 규칙이 된다.',
  },
  {
    id: 'ai',
    label: 'AI 기록',
    title: '해석 편향과 누락',
    text: 'AI가 빠르게 잡아낸 패턴과 놓친 감각을 나누어 기록한다. 그 차이를 다음 프롬프트의 조건으로 바꾸면 분석 로그가 연구 자료가 된다.',
  },
];

const themeNames: Record<Critique['theme'], string> = {
  midnight: 'Cobalt',
  paper: 'Violet',
  fog: 'Slate',
  ember: 'Signal',
};

function App() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <Link className="brand" to="/" aria-label="Katze Atelier Home">
          <img src="/images/profile.webp" alt="안경을 쓰고 컵을 든 고양이" />
          <span>
            <strong>Katze Atelier</strong>
            <small>Dreamlike Research Lab</small>
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
          <Route path="/dreamlike-theory" element={<DreamlikeTheory />} />
          <Route path="/critiques" element={<Critiques />} />
          <Route path="/critiques/:id" element={<CritiqueDetail />} />
          <Route path="/essays" element={<Essays />} />
          <Route path="/essays/:id" element={<EssayDetail />} />
          <Route path="/experiments" element={<Experiments />} />
          <Route path="/ai-workshop" element={<AIWorkshop />} />
          <Route path="/effect-library" element={<EffectLibrary />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <footer className="site-footer">
        <span>Katze Atelier studies dreamlike aesthetics through criticism, AI analysis, and web experiments.</span>
        <Link to="/dreamlike-theory">Research Index</Link>
      </footer>
    </div>
  );
}

function Home() {
  const featuredExperiment = experimentData[0];

  return (
    <div className="page-stack">
      <section className="home-hero">
        <div className="hero-index" aria-hidden="true">
          <span>01</span>
          <span>Dreamlike Systems</span>
        </div>
        <div className="hero-main">
          <p className="eyebrow">Editorial Lab for Critique and AI Reading</p>
          <h1>몽환성은 감상이 아니라 분석 가능한 구조다.</h1>
          <p>
            Katze Atelier는 작품 비평, 시론, AI 분석 기록, 웹 실험을 통해 몽환성이 어떻게 발생하고
            재사용 가능한 창작 규칙으로 바뀌는지 연구하는 개인 리서치 사이트입니다.
          </p>
          <div className="hero-actions">
            <Link className="primary-link" to="/dreamlike-theory">
              이론 인덱스 보기
            </Link>
            <Link className="ghost-link" to="/critiques">
              아카이브 탐색
            </Link>
          </div>
        </div>
        <aside className="hero-symbol" aria-label="브랜드 심볼">
          <img src="/images/profile.webp" alt="안경을 쓰고 컵을 든 고양이 프로필" />
          <dl>
            <div>
              <dt>Focus</dt>
              <dd>Dreamlike Aesthetics</dd>
            </div>
            <div>
              <dt>Method</dt>
              <dd>Critique / AI / Interface</dd>
            </div>
          </dl>
        </aside>
      </section>

      <section className="metric-strip" aria-label="연구 현황">
        <Metric value={critiqueData.length.toString().padStart(2, '0')} label="Critiques" />
        <Metric value={essayData.length.toString().padStart(2, '0')} label="Theory Notes" />
        <Metric value={experimentData.length.toString().padStart(2, '0')} label="Experiments" />
        <Metric value={effectData.length.toString().padStart(2, '0')} label="Effect References" />
      </section>

      <ContentSection
        kicker="Recent Critiques"
        title="비평 아카이브"
        lead="작품명, 매체, 몽환성 유형, 태그를 기준으로 읽는 잡지형 카드 그리드입니다."
      >
        <div className="magazine-grid">
          {critiqueData.slice(0, 3).map((critique, index) => (
            <CritiqueCard key={critique.id} critique={critique} index={index + 1} />
          ))}
        </div>
      </ContentSection>

      <section className="split-section">
        <ContentBlock
          kicker="Theory Notes"
          title="시론과 개념 노트"
          description="몽환성의 조건, AI 독자의 역할, 사물 중심 서사를 개념 단위로 정리합니다."
          to="/essays"
          linkLabel="시론 목록"
        />
        <div className="stacked-list">
          {essayData.map((essay, index) => (
            <EssayRow key={essay.id} essay={essay} index={index + 1} />
          ))}
        </div>
      </section>

      <section className="home-lab-panel">
        <div>
          <p className="eyebrow">Experiment Entry</p>
          <h2>{featuredExperiment.title}</h2>
          <p>{featuredExperiment.summary}</p>
        </div>
        <Link className="arrow-link" to="/experiments">
          Experiment Lab
        </Link>
      </section>
    </div>
  );
}

function DreamlikeTheory() {
  return (
    <div className="page-stack">
      <PageIntro
        label="Dreamlike Theory"
        title="몽환성 개념 사전"
        description="작품 분석에 반복적으로 쓰이는 개념, 관찰 신호, 분석 모델을 인덱스처럼 정리합니다."
      />

      <section className="theory-layout">
        <div className="theory-map">
          <h2>Analysis Model</h2>
          <div className="model-steps">
            {analysisModels.map((model) => (
              <article className="model-card" key={model.phase}>
                <span>{model.phase}</span>
                <h3>{model.title}</h3>
                <p>{model.question}</p>
              </article>
            ))}
          </div>
        </div>

        <aside className="index-panel">
          <span className="panel-label">Primary Index</span>
          <strong>Dreamlike Aesthetics</strong>
          <p>감상 언어를 분석 가능한 변수로 분해하고, 창작 실험으로 다시 조립합니다.</p>
        </aside>
      </section>

      <ContentSection
        kicker="Glossary"
        title="개념 항목"
        lead="학술 노트처럼 차갑게 읽히되, 실제 비평에 바로 연결되도록 구성했습니다."
      >
        <div className="term-grid">
          {theoryTerms.map((term) => (
            <article className="term-card" key={term.index}>
              <span className="index-number">{term.index}</span>
              <h2>{term.name}</h2>
              <p>{term.definition}</p>
              <small>{term.signal}</small>
            </article>
          ))}
        </div>
      </ContentSection>

      <ContentSection
        kicker="Typology"
        title="몽환성 유형"
        lead="비평 카드와 AI Workshop에서 다시 쓰기 위한 유형 분류입니다."
      >
        <div className="data-table" role="table" aria-label="몽환성 유형 표">
          <div className="table-row table-head" role="row">
            <span>Code</span>
            <span>Type</span>
            <span>Description</span>
            <span>Method</span>
          </div>
          {dreamTypes.map((type) => (
            <div className="table-row" role="row" key={type.code}>
              <span>{type.code}</span>
              <strong>{type.name}</strong>
              <span>{type.description}</span>
              <span>{type.method}</span>
            </div>
          ))}
        </div>
      </ContentSection>
    </div>
  );
}

function Critiques() {
  const [query, setQuery] = useState('');
  const [activeType, setActiveType] = useState('전체');
  const dreamFilters = ['전체', ...Array.from(new Set(critiqueData.map((critique) => critique.dreamType)))];

  const filteredCritiques = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return critiqueData.filter((critique) => {
      const matchesType = activeType === '전체' || critique.dreamType === activeType;
      const searchable = [critique.title, critique.medium, critique.summary, critique.dreamType, ...critique.moodTags]
        .join(' ')
        .toLowerCase();
      return matchesType && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [activeType, query]);

  return (
    <div className="page-stack">
      <PageIntro
        label="Critique Archive"
        title="작품 비평 아카이브"
        description="매체, 몽환성 유형, 태그, 요약을 한눈에 비교하는 현대적 리서치 카드 목록입니다."
      />

      <section className="filter-panel" aria-label="비평 필터">
        <label htmlFor="critique-search">Search</label>
        <input
          id="critique-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="작품명, 매체, 태그 검색"
        />
        <div className="segmented-control" aria-label="몽환성 유형 필터">
          {dreamFilters.map((type) => (
            <button
              className={type === activeType ? 'is-selected' : ''}
              key={type}
              type="button"
              onClick={() => setActiveType(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </section>

      <div className="archive-grid">
        {filteredCritiques.map((critique, index) => (
          <CritiqueCard key={critique.id} critique={critique} index={index + 1} />
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
    <article className={`detail-page critique-theme theme-${critique.theme}`}>
      <Link className="back-link" to="/critiques">
        Critique Archive
      </Link>

      <div className="detail-grid">
        <aside className="detail-meta" aria-label="작품 메타 정보">
          <img src="/images/profile.webp" alt="" aria-hidden="true" />
          <dl>
            <div>
              <dt>Work</dt>
              <dd>{critique.title}</dd>
            </div>
            <div>
              <dt>Medium</dt>
              <dd>{critique.medium}</dd>
            </div>
            <div>
              <dt>Dream Type</dt>
              <dd>{critique.dreamType}</dd>
            </div>
            <div>
              <dt>Accent</dt>
              <dd>{themeNames[critique.theme]}</dd>
            </div>
          </dl>
          <TagList tags={critique.moodTags} />
        </aside>

        <div className="detail-content">
          <header className="detail-hero">
            <p className="eyebrow">{critique.medium}</p>
            <h1>{critique.title}</h1>
            <p>{critique.summary}</p>
          </header>

          <nav className="toc-panel" aria-label="비평 목차">
            {critiqueSections.map(([number, label]) => (
              <a key={number} href={`#section-${number}`}>
                <span>{number}</span>
                {label}
              </a>
            ))}
          </nav>

          <div className="detail-sections">
            {critiqueSections.map(([number, label, key]) => (
              <section className="essay-section" id={`section-${number}`} key={key}>
                <span className="section-number">{number}</span>
                <h2>{label}</h2>
                <p>{critique[key]}</p>
              </section>
            ))}
          </div>
        </div>
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
        description="핵심 질문, 개념 정의, 반론과 한계를 중심으로 정리한 이론 노트입니다."
      />
      <div className="essay-index">
        {essayData.map((essay, index) => (
          <EssayRow key={essay.id} essay={essay} index={index + 1} />
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
        Essays
      </Link>
      <div className="detail-grid">
        <aside className="detail-meta">
          <span className="panel-label">{essay.status}</span>
          <h2>{essay.category}</h2>
          <TagList tags={essay.keywords} />
        </aside>

        <div className="detail-content">
          <header className="detail-hero">
            <p className="eyebrow">{essay.category}</p>
            <h1>{essay.title}</h1>
          </header>

          <div className="detail-sections">
            <EssayPanel number="01" title="핵심 질문">
              <p>{essay.question}</p>
            </EssayPanel>
            <EssayPanel number="02" title="개념 정의">
              <p>{essay.conceptDefinition}</p>
            </EssayPanel>
            <EssayPanel number="03" title="주요 논지">
              <NumberedTextList items={essay.mainArguments} />
            </EssayPanel>
            <EssayPanel number="04" title="예시 작품">
              <TagList tags={essay.exampleWorks} />
            </EssayPanel>
            <EssayPanel number="05" title="반론과 한계">
              <p>{essay.counterLimits}</p>
            </EssayPanel>
            <EssayPanel number="06" title="다음 질문">
              <NumberedTextList items={essay.nextQuestions} />
            </EssayPanel>
          </div>
        </div>
      </div>
    </article>
  );
}

function Experiments() {
  return (
    <div className="page-stack">
      <PageIntro
        label="Experiment Lab"
        title="읽기 경험을 실험하는 인터페이스 랩"
        description="클릭형 텍스트, 이미지 감상, 아카이브 UI를 가벼운 모션과 함께 테스트합니다."
      />
      <div className="experiment-lab-grid">
        {experimentData.map((experiment, index) => (
          <article className="experiment-card" key={experiment.id}>
            <span className="experiment-index">{String(index + 1).padStart(2, '0')}</span>
            <div>
              <p className="eyebrow">{experiment.kind}</p>
              <h2>{experiment.title}</h2>
              <p>{experiment.summary}</p>
            </div>
            <div className="experiment-footer">
              <span>{experiment.status}</span>
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
        title="분석 입력과 결과 기록을 나누는 워크벤치"
        description="실제 API 연결 전 단계의 샘플 분석 도구입니다. 입력, 분석 유형, 결과, 기록 패널을 분리했습니다."
      />

      <section className="workshop-dashboard">
        <form className="tool-card input-panel" onSubmit={handleSubmit}>
          <div className="panel-heading">
            <span>Input</span>
            <strong>Analysis Target</strong>
          </div>
          <label htmlFor="analysis-target">분석 대상</label>
          <textarea
            id="analysis-target"
            value={target}
            onChange={(event) => setTarget(event.target.value)}
            placeholder="작품 제목, 장면 설명, 이미지 메모, 감상 기록을 적어주세요."
          />
          <button className="primary-button" type="submit">
            샘플 분석 생성
          </button>
        </form>

        <section className="tool-card type-panel" aria-label="분석 유형 선택">
          <div className="panel-heading">
            <span>Mode</span>
            <strong>Analysis Type</strong>
          </div>
          <div className="choice-grid">
            {aiPerspectives.map((item) => (
              <button
                className={item.id === selectedPerspective ? 'is-selected' : ''}
                key={item.id}
                type="button"
                onClick={() => setSelectedPerspective(item.id)}
              >
                <span>{item.label}</span>
                <small>{item.title}</small>
              </button>
            ))}
          </div>
        </section>

        <aside className="tool-card result-panel">
          <div className="panel-heading">
            <span>Result</span>
            <strong>{perspective.title}</strong>
          </div>
          <p className="target-line">분석 대상: {submittedTarget}</p>
          <p>{perspective.text}</p>
        </aside>

        <aside className="tool-card log-panel">
          <div className="panel-heading">
            <span>Log</span>
            <strong>Sample Records</strong>
          </div>
          <ol>
            <li>반복 사물과 장면 간격을 분리해 기록</li>
            <li>AI가 놓친 감각을 다음 프롬프트 조건으로 전환</li>
            <li>결과 문장을 창작 규칙 1개로 요약</li>
          </ol>
        </aside>
      </section>
    </div>
  );
}

function EffectLibrary() {
  return (
    <div className="page-stack">
      <PageIntro
        label="Effect Library"
        title="몽환성 웹 효과 레퍼런스"
        description="효과 이름, 사용 라이브러리, 난이도, 성능 비용, 어울리는 몽환성 유형을 데이터베이스처럼 정리합니다."
      />

      <div className="effect-library">
        {effectData.map((effect) => (
          <article className="effect-row" key={effect.name}>
            <div>
              <span className="panel-label">{effect.library}</span>
              <h2>{effect.name}</h2>
              <p>{effect.useCase}</p>
            </div>
            <dl>
              <div>
                <dt>Difficulty</dt>
                <dd>{effect.difficulty}</dd>
              </div>
              <div>
                <dt>Cost</dt>
                <dd>{effect.performanceCost}</dd>
              </div>
              <div>
                <dt>Dream Type</dt>
                <dd>{effect.dreamType}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </div>
  );
}

function ContentSection({
  kicker,
  title,
  lead,
  children,
}: {
  kicker: string;
  title: string;
  lead: string;
  children: ReactNode;
}) {
  return (
    <section className="content-section">
      <div className="section-heading">
        <p className="eyebrow">{kicker}</p>
        <h2>{title}</h2>
        <p>{lead}</p>
      </div>
      {children}
    </section>
  );
}

function ContentBlock({
  kicker,
  title,
  description,
  to,
  linkLabel,
}: {
  kicker: string;
  title: string;
  description: string;
  to: string;
  linkLabel: string;
}) {
  return (
    <div className="content-block">
      <p className="eyebrow">{kicker}</p>
      <h2>{title}</h2>
      <p>{description}</p>
      <Link className="arrow-link" to={to}>
        {linkLabel}
      </Link>
    </div>
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

function CritiqueCard({ critique, index }: { critique: Critique; index: number }) {
  return (
    <Link className={`archive-card theme-${critique.theme}`} to={`/critiques/${critique.id}`}>
      <div className="card-index">
        <span>{String(index).padStart(2, '0')}</span>
        <span>{critique.medium}</span>
      </div>
      <h2>{critique.title}</h2>
      <p>{critique.summary}</p>
      <div className="card-meta-line">
        <strong>{critique.dreamType}</strong>
        <span>{themeNames[critique.theme]}</span>
      </div>
      <TagList tags={critique.moodTags} />
    </Link>
  );
}

function EssayRow({ essay, index }: { essay: Essay; index: number }) {
  return (
    <Link className="essay-row" to={`/essays/${essay.id}`}>
      <span>{String(index).padStart(2, '0')}</span>
      <div>
        <strong>{essay.title}</strong>
        <p>{essay.question}</p>
      </div>
      <small>{essay.category}</small>
      <em>{essay.status}</em>
    </Link>
  );
}

function EssayPanel({ number, title, children }: { number: string; title: string; children: ReactNode }) {
  return (
    <section className="essay-section">
      <span className="section-number">{number}</span>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="metric-card">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
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
