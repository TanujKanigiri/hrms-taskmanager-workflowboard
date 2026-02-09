# Payroll & Payslip Generation Logic

This document details the algorithmic logic, dependencies, and step-by-step workflow used in the **ZentraHR Payroll Module** to generate payslips and calculate taxes.

---

## 1. Core Dependencies

The payroll engine relies on the following client-side libraries for document generation:
*   **`jspdf`**: Used for creating the PDF document structure (canvas, text, shapes).
*   **`jspdf-autotable`**: A plugin for `jspdf` that automatically calculates row heights and column widths for the "Earnings" and "Deductions" tables.

---

## 2. Salary Structure & Assumptions

The system uses a standard Indian payroll structure derived from the **Annual Cost to Company (CTC)**.

### **Earnings Breakdown**
| Component | Formula | Description |
| :--- | :--- | :--- |
| **Basic Salary** | `Monthly CTC * 40%` | Fixed base taxable component. |
| **HRA** | `Monthly CTC * 20%` | House Rent Allowance. |
| **Special Allowance** | `Monthly CTC * 30%` | Balancing figure for other perks. |
| **Performance Bonus** | `Monthly CTC * 10%` | Variable pay (can be overridden). |

### **Statutory Deductions**
| Component | Value/Formula | Notes |
| :--- | :--- | :--- |
| **Provident Fund (PF)** | `₹3,600` (Flat) | Simplified flat rate for this demo. |
| **Professional Tax** | `₹200` (Flat) | Standard state tax assumption. |
| **Income Tax (TDS)** | `Dynamic` | Calculated by the **Smart Tax AI Engine**. |

---

## 3. Tax Calculation Engine (Smart Tax AI)

We support both **Old** and **New** tax regimes (FY 2025-26 logic).

### **Standard Deduction**
*   **Flat ₹50,000** applied to Gross Income before tax calculation for both regimes.

### **New Regime Slabs (Default)**
Used if `regime === 'new'`. No exemptions (80C/HRA) allowed.
1.  **0 - 3L**: 0%
2.  **3L - 6L**: 5%
3.  **6L - 9L**: 10%
4.  **9L - 12L**: 15%
5.  **12L - 15L**: 20%
6.  **> 15L**: 30%

### **Old Regime Slabs (Simplified)**
Used if `regime === 'old'`.
*   **Exemptions**: Automatically deducts `₹1.5L` (80C assumption) + `₹24,000` (HRA assumption).
*   **Slabs**:
    1.  **0 - 2.5L**: 0%
    2.  **2.5L - 5L**: 5%
    3.  **5L - 10L**: 20%
    4.  **> 10L**: 30%

---

## 4. Correction & Pro-Rata Logic

The "Correction Mode" (Pen Icon) allows HR to handle exceptions (Loss of Pay).

**Formula:**
```javascript
Current_Payable_Days = User_Input (Default: 31)
Pro_Rata_Factor = Current_Payable_Days / 31

Adjusted_Earnings = Standard_Earnings * Pro_Rata_Factor
```
*Note: Statutory fixed deductions like PF often remain full unless wage falls below a threshold, but for simplicity, we keep deductions fixed while earnings shrink.*

---

## 5. PDF Generation Workflow (`handleDownloadPayslipPDF`)

1.  **Initialization**: Creates a `new jsPDF()` instance.
2.  **Branding**: Draws a Slate-900 header rectangle and adds the "ZentraHR" logo text.
3.  **Metadata**: Writes "Private & Confidential", Employee ID, Department, Bank Details, and **Payable Days** (crucial for audit).
4.  **Earnings Table**:
    *   Uses `autoTable` with an **Emerald-500** header theme.
    *   Columns: `Component`, `Amount`, `YTD (Approx)`.
5.  **Deductions Table**:
    *   Uses `autoTable` with a **Red-500** header theme.
    *   Placed dynamically below the Earnings table usage `doc.lastAutoTable.finalY`.
6.  **Net Pay**:
    *   Calculated as `Total Earnings - Total Deductions`.
    *   Rendered in a highlighted rounded rectangle at the bottom right.
7.  **Output**: Triggers `doc.save()` to download the file client-side.

---

## 6. Code Location

All logic resides in:
`frontend/src/app/dashboard/payroll/payslips/page.tsx`
*   **Tax Logic**: `calculateTax` function.
*   **PDF Logic**: `handleDownloadPayslipPDF` function.
*   **State Management**: `PayslipsPage` component.
