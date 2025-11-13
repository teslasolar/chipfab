# 🔬 LocalChip - AI Chip Fabrication

**DIY RISC-V semiconductor fab at 180nm | $100K → 100 chips/month @ $500**

[![View Site](https://img.shields.io/badge/View-GitHub%20Pages-00ff00?style=for-the-badge)](https://teslasolar.github.io/chipfab)

## 🧬 Chip Specification

- **Architecture:** RISC-V (4 cores)
- **Process Node:** 180nm
- **Die Area:** 25mm²
- **Frequency:** 100MHz
- **Power:** 2W
- **SRAM:** 512KB
- **I/O:** 32 pins

## 📦 What's Included

### Components
- 🎯 **Design** - AI-generated RTL to GDS
- 💎 **Wafer** - Silicon substrate preparation
- 📏 **Lithography** - UV pattern transfer
- ⚡ **Etch** - Material removal (wet/dry)
- 🧪 **Doping** - Ion implantation
- 🔥 **Anneal** - Thermal treatment
- 🧠 **Test** - AI-powered validation

### Documentation
- 📦 **BOM** - Complete parts list ($6K equipment)
- 💰 **Economics** - Cost model (96% margin)
- ⚠️ **Safety** - Compliance & hazard guide
- 📡 **Flow** - Process timeline (5 weeks first run)

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/teslasolar/chipfab.git

# Open locally
cd chipfab
python -m http.server 8000

# Visit http://localhost:8000
```

## 🏭 3D Factory View

Explore the chip fabrication process in interactive 3D! Navigate through a virtual cleanroom with:
- 🤖 Wafer handling robots
- 📏 Lithography steppers
- ⚡ Etching chambers
- 🔥 Diffusion furnaces
- 🌀 Spin coaters
- 🧠 Test stations

**[Launch 3D Factory](factory3d/index.html)** | Mouse: Orbit | Scroll: Zoom

## 💰 Economics

- **Equipment:** $6,000 (one-time)
- **Per batch:** $235 (25 chips)
- **Yield:** 60% (15 good chips)
- **Cost/chip:** $19
- **Retail:** $500
- **Margin:** 96%

**Goal:** 100 chips/month = $48K profit

## 🏭 Sources

- **Equipment:** eBay, AliExpress, Omega
- **Chemicals:** Sigma-Aldrich, Transene
- **Wafers:** UniversityWafer ($50), eBay ($20)
- **Masks:** FrontRange ($300), Photronics ($500)

## 📚 Learn More

- [SiliconRun](https://www.siliconrun.com)
- [Sam Zeloof's Fab](https://sam.zeloof.xyz)
- [Jeri Ellsworth](https://www.youtube.com/user/jeriellsworth)
- [MIT 6.152](https://ocw.mit.edu)

## 🔗 Tools

- [OpenLane](https://github.com/efabless/openlane) - RTL to GDS
- [Magic](http://opencircuitdesign.com/magic/) - Layout editor
- [KLayout](https://www.klayout.de/) - GDS viewer

## ⚠️ Safety

**CRITICAL:** HF acid requires fume hood, PPE, and Ca-gluconate. See [safety guide](docs/safety.html).

## 📄 License

MIT License - Build responsibly

---

**Status:** Experimental | **Variant:** Garage setup
