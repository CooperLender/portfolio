// ============================================================
// ALL home-page content lives here (English + Japanese).
// To swap projects later: edit the `projects` arrays below —
// no design changes needed.
// ============================================================

export const profile = {
  name: "Cooper Lender",
  email: "clender@stanford.edu",
  github: "https://github.com/CooperLender",
  linkedin: "https://www.linkedin.com/in/cooper-lender-a78587336/",
  resumePath: "resume.pdf",
};

export const content = {
  en: {
    hero: {
      kicker: "Stanford EE — Hardware × Software",
      sub: "EE student who likes the full chain: real signals, real circuits, and the firmware that makes sense of them.",
      spec: ["ADCs", "Analog Front-Ends", "Embedded / Firmware", "Mechatronics"],
      note:
        "Looking for internships in Japan and roles at the intersection of embedded systems, electronics, and software.",
      buttons: { email: "Email", resume: "Resume (PDF)" },
    },

    research: {
      figNo: "FIG. 01",
      title: "Current Research — ADCs",
      lede: "What I'm working on this summer.",
      // EDIT ME: add your lab name / university / advisor and specifics
      // of your summer research when you're ready.
      body:
        "This summer I'm doing research on analog-to-digital converters — modeling ADC behavior and analyzing the non-idealities (quantization, sampling, noise) that separate a real converter from an ideal one.",
      demoNote:
        "Below is a live model of what an ADC does: the orange curve is a smooth, real-world analog signal, and the blue steps are the digital version a computer can store. Drag the sliders to see the trade-offs — drop the sample rate too low and the signal gets misread (aliasing).",
    },

    projects: {
      figNo: "FIG. 02",
      title: "Projects",
      lede: "Hands-on builds — design, implementation, validation, debugging.",
      items: [
        {
          title: "EKG Analog Front-End",
          href: "./projects/ekg-front-end/",
          desc: "Instrumentation amplifier + active bandpass filter to clean mV-level EKG signals; validated with test inputs and a measured heartbeat.",
          tags: ["Analog", "Op-Amps", "Signal Processing"],
        },
        {
          title: "Joystick Rain Animation (8×8 LED)",
          href: "./projects/rain-joystick/",
          desc: "Interactive LED rain simulation where joystick input changes gravity direction in real time (deadzone + multiplexed scanning).",
          tags: ["Embedded", "LED Matrix", "Input Systems"],
        },
        {
          title: "Useless Box: Hardware Control vs Arduino “Personalities”",
          href: "./projects/useless-box/",
          desc: "Electromechanical 'anti-user' box that flips its own switch off; compared hardware-only logic vs Arduino personalities (with demo video).",
          tags: ["Mechatronics", "State Machines", "Motor Control"],
        },
      ],
    },

    skills: { figNo: "FIG. 03", title: "Skills" },

    about: {
      figNo: "FIG. 04",
      title: "About",
      items: [
        {
          label: "EE",
          text: "I'm most excited by hardware–software systems where real signals and real constraints matter — analog front-ends, data converters, sensing, and debugging the full chain from circuit behavior to firmware.",
        },
        {
          label: "CS",
          text: "On the software side, I enjoy building practical tools and interactive systems — clean code, edge cases, fast iteration, especially when software is tightly coupled to hardware (timing, IO, state machines).",
        },
        {
          label: "Off-hours",
          text: "Coffee enthusiast, cook, tennis player, skier. Good balance from engineering and a great way to reset.",
        },
      ],
    },

    contact: {
      figNo: "FIG. 05",
      title: "Contact",
      lede: "Best way to reach me: email. I'm also active on GitHub and LinkedIn.",
      buttons: { email: "Email", resume: "Resume (PDF)" },
    },
  },

  ja: {
    hero: {
      kicker: "スタンフォード大学 EE — ハードウェア × ソフトウェア",
      sub: "実際の信号・実際の回路・それを読み取るファームウェアまで、一気通貫で作るのが好きなEE専攻の学生です。",
      spec: ["ADC", "アナログ・フロントエンド", "組込み / ファームウェア", "メカトロニクス"],
      note:
        "日本でのインターンを志望しています。組込み・回路・ソフトウェアが交差する領域で「動くシステム」を作る仕事に惹かれています。",
      buttons: { email: "メール", resume: "履歴書（PDF）" },
    },

    research: {
      figNo: "FIG. 01",
      title: "現在の研究 — ADC",
      lede: "今年の夏に取り組んでいるテーマです。",
      // 編集してください：研究室名・大学・指導教員・研究内容の詳細
      body:
        "この夏はアナログ・デジタル変換器（ADC）の研究に取り組んでいます。ADCの挙動をモデル化し、量子化・サンプリング・ノイズなど、理想的な変換器と実際の変換器を分ける非理想性を解析しています。",
      demoNote:
        "下は、ADCの動作を示すライブモデルです。オレンジの曲線が現実世界のアナログ信号、青い階段がコンピュータに保存されるデジタル版です。スライダーを動かしてトレードオフを確かめてみてください。サンプリング周波数を下げすぎると、信号が誤って読み取られます（エイリアシング）。",
    },

    projects: {
      figNo: "FIG. 02",
      title: "プロジェクト",
      lede: "設計 → 実装 → 検証 → デバッグまで、一通り手を動かした成果です。",
      items: [
        {
          title: "EKG（心電図）アナログ・フロントエンド",
          href: "./projects/ekg-front-end/",
          desc: "mVレベルの心電図信号を、計装アンプ＋アクティブ帯域フィルタで整形。テスト入力と実測波形で検証しました。",
          tags: ["アナログ", "オペアンプ", "信号処理"],
        },
        {
          title: "ジョイスティック操作の雨アニメ（8×8 LED）",
          href: "./projects/rain-joystick/",
          desc: "ジョイスティック入力で「重力方向」を切り替え、雨粒がリアルタイムに流れるインタラクティブなLEDアニメーション。",
          tags: ["組込み", "LEDマトリクス", "入力処理"],
        },
        {
          title: "無駄な箱（物理制御 vs Arduino）",
          href: "./projects/useless-box/",
          desc: "スイッチを入れると指が出てきてスイッチを戻す装置。物理中心の制御とArduinoによる「性格づけ」を比較しました（デモ動画あり）。",
          tags: ["メカトロ", "状態機械", "モータ制御"],
        },
      ],
    },

    skills: { figNo: "FIG. 03", title: "スキル" },

    about: {
      figNo: "FIG. 04",
      title: "自己紹介",
      items: [
        {
          label: "EE",
          text: "実際の信号と制約が問われるハードウェア×ソフトウェアのシステムに一番わくわくします。アナログ・フロントエンド、データ変換器、センシング、そして回路からファームウェアまでの一連のデバッグが好きです。",
        },
        {
          label: "CS",
          text: "ソフトウェアでは、実用的なツールやインタラクティブなシステムを作るのが好きです。タイミング・IO・状態機械など、ハードウェアと密結合したコードほど面白いと感じます。",
        },
        {
          label: "趣味",
          text: "コーヒー好きで、料理も好きです。テニスとスキーで体を動かすのが、勉強からの良い切り替えになっています。",
        },
      ],
    },

    contact: {
      figNo: "FIG. 05",
      title: "連絡先",
      lede: "メールでの連絡が一番確実です。GitHubとLinkedInも見ています。",
      buttons: { email: "メール", resume: "履歴書（PDF）" },
    },
  },
};
