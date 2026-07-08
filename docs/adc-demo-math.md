# ADC Demo — The Math Behind It

Reference for the interactive **"ADC-01 — Turning Analog into Digital"** panel on the
portfolio home page ([`src/components/AdcDemo.astro`](../src/components/AdcDemo.astro)).
Every formula on screen is listed here with its derivation, its source, and how it maps to the code.

---

## 1. The input signal

The orange curve is a pure sine, drawn with 2.5 cycles visible across the canvas:

$$x(t) = \sin\!\big(2\pi (t + \phi)\big)$$

The phase $\phi$ advances slowly each animation frame so the waveform drifts. It has no
effect on the math — it only makes the display feel alive.

## 2. Sampling and the staircase (zero-order hold)

The ADC measures the signal at regular instants

$$t_k = \frac{k}{f_s}, \qquad k = 0, 1, 2, \ldots$$

where the **Sample rate** slider sets the ratio $f_s/f$ (samples per signal cycle,
range 1.2–16). The blue staircase holds each measured value until the next sample —
a **zero-order hold (ZOH)**, which is how a sampled value actually sits in a register
or appears at a DAC output.

> Source: standard sampled-data theory — A. V. Oppenheim & R. W. Schafer,
> *Discrete-Time Signal Processing*.

## 3. Quantization

With **N** bits (Resolution slider, 1–8), the converter can only output
$2^N$ distinct levels. The demo uses a uniform rounding quantizer over the
full-scale range $[-1, 1]$:

$$\text{code} = \operatorname{round}\!\left(\frac{x + 1}{2}\,\big(2^N - 1\big)\right),
\qquad
x_q = \frac{2\,\text{code}}{2^N - 1} - 1$$

* Step size: $\Delta = \dfrac{2}{2^N - 1}$ (both extremes $\pm 1$ are representable)
* Worst-case error: $\Delta/2$ (round-to-nearest)
* $N = 1$ degenerates to a single comparator outputting $\pm 1$ — as it should.

**Convention note:** textbooks usually define $\Delta = \mathrm{FSR}/2^N$; this demo uses
$\mathrm{FSR}/(2^N - 1)$ so the sine's peaks land exactly on the top and bottom levels.
The two agree as $N$ grows and nothing else in the demo depends on the choice.

> Source: uniform quantization is covered in any DSP text; the quantization-error
> model originates with W. R. Bennett, "Spectra of Quantized Signals,"
> *Bell System Technical Journal*, 1948.

### Ideal SNR (shown in an earlier version, since removed from the UI)

Modeling quantization error as uniform noise over $\pm\Delta/2$ (power $\Delta^2/12$)
against a full-scale sine gives the classic rule of thumb:

$$\mathrm{SNR} = 10\log_{10}\!\left(\tfrac{3}{2}\cdot 4^{N}\right)
\approx 6.02\,N + 1.76\ \text{dB}$$

Verified numerically: the approximation matches the exact form to 0.01 dB for all N used.

> Source: derivation in Analog Devices tutorial **MT-001**,
> "Taking the Mystery out of the Infamous Formula SNR = 6.02N + 1.76 dB."

## 4. Aliasing (the Nyquist limit)

The **Nyquist–Shannon sampling theorem** requires

$$f_s > 2f \quad \text{(strict inequality)}$$

to capture a sine at frequency $f$. Below that, the samples are indistinguishable from a
slower sine at $\big|f - f_s \cdot \operatorname{round}(f/f_s)\big|$ — the slow wave the
staircase visibly traces when the slider drops low. The demo warns whenever
$f_s \le 2f$: equality is **not** sufficient, since at exactly $f_s = 2f$ the samples
can land on the zero crossings and miss the signal entirely.

> Source: H. Nyquist, "Certain Topics in Telegraph Transmission Theory," 1928;
> C. E. Shannon, "Communication in the Presence of Noise," *Proc. IRE*, 1949.

## 5. The power bar — ideal flash ADC

Two standard facts, multiplied together:

**Comparator count.** An N-bit flash ADC compares the input against every threshold
between its $2^N$ levels simultaneously, so it needs

$$N_{\text{comp}} = 2^N - 1 \ \text{comparators}$$

This exponential growth in comparators (and area, and input capacitance) is exactly why
real flash converters top out around 8 bits.

**Speed costs power.** Each comparator is clocked at $f_s$, and dynamic CMOS power is
proportional to switching rate ($P = \alpha C V^2 f$). Combining:

$$P \ \propto\ \big(2^N - 1\big)\cdot f_s$$

This matches the standard **Walden figure of merit** used to compare real ADCs,
$\mathrm{FOM} = P / (2^{\mathrm{ENOB}} \cdot f_s)$, i.e. power proportional to
$2^N f_s$.

> Sources: flash architecture — B. Razavi, *Principles of Data Conversion System
> Design*, IEEE Press, 1995. Power scaling — R. H. Walden, "Analog-to-Digital
> Converter Survey and Analysis," *IEEE J. Selected Areas in Communications*, 1999.

### Normalization and the log-scale bar

The readout is relative to the demo's minimum operating point
($N = 1$, $f_s = 1.2f$):

$$P_{\min} = 1 \times 1.2 = 1.2, \qquad
P_{\max} = 255 \times 16 = 4080, \qquad
\frac{P_{\max}}{P_{\min}} = 3400$$

— hence "3,400× min power" with both sliders maxed. The bar fill is logarithmic,

$$\text{fill} = \frac{\ln(P/P_{\min})}{\ln(P_{\max}/P_{\min})}$$

because a 3400:1 range on a linear bar would sit near zero almost everywhere.

### Model caveats

The label says *ideal* flash on purpose. The model ignores static bias current,
the thermometer-to-binary encoder, and supply-voltage scaling. What it does capture —
exponential cost in bits, linear cost in speed — is the true and important scaling law,
and the reason architecture choice (SAR, pipeline, ΔΣ) depends on the
resolution/speed/power corner you need.

---

## Verification summary (2026-07-08)

| Check | Method | Result |
|---|---|---|
| Quantizer levels, N = 2 | Enumerate outputs over [−1, 1] | Exactly {−1, −⅓, +⅓, +1} |
| Max quantization error | Sweep 20 001 points, N = 2/4/8 | Equals Δ/2 in every case |
| 1-bit degeneration | Evaluate at N = 1 | Outputs only ±1 (single comparator) |
| SNR rule of thumb | Compare 6.02N + 1.76 vs 10 log₁₀(1.5·4ᴺ) | Agree to 0.01 dB |
| Power endpoints | (255·16)/(1·1.2) | 3400× — matches display |
| Nyquist edge case | fs = 2f exactly | Was un-flagged; **fixed** to warn on fs ≤ 2f |

## References

1. A. V. Oppenheim & R. W. Schafer, *Discrete-Time Signal Processing*, Prentice Hall.
2. W. R. Bennett, "Spectra of Quantized Signals," *Bell System Technical Journal*, vol. 27, 1948.
3. Analog Devices, Tutorial MT-001: *Taking the Mystery out of the Infamous Formula SNR = 6.02N + 1.76 dB*.
4. C. E. Shannon, "Communication in the Presence of Noise," *Proceedings of the IRE*, vol. 37, 1949.
5. B. Razavi, *Principles of Data Conversion System Design*, IEEE Press, 1995.
6. R. H. Walden, "Analog-to-Digital Converter Survey and Analysis," *IEEE Journal on Selected Areas in Communications*, vol. 17, no. 4, 1999.
