# Jira Project Setup & QA Testing Strategy Document
## App Name: ClaspConnect (Elderly Companionship & Micro-Volunteering Platform)
**Module**: SE3050 - User Experience Engineering  
**Tech Stack**: React Native (Expo SDK 57), Firebase Backend, Jira QA Testing Framework  

---

## 1. Jira Project Setup & Workflow Architecture

### 1.1 Project Settings
- **Project Name**: ClaspConnect Mobile Platform
- **Project Key**: `CLASP`
- **Project Type**: Software Development (Agile Scrum / Kanban Board)
- **Target Release / Version**: `v1.0.0-MVP`

### 1.2 Issue Types
1. **Epic**: High-level capability (e.g. `CLASP-E1: Elderly Companionship Portal`, `CLASP-E2: Volunteer Gamification & Verification`)
2. **User Story**: Persona user requirement matching US01-US04 from SLIIT Lab Sheet 03.
3. **Task**: Technical setup (e.g. `Firebase Auth Integration`, `React Navigation Setup`)
4. **Bug**: Defect identified during test execution (Severity: Blocked, Critical, Major, Minor)
5. **Test Case**: QA test specification (integrated via Xray / Zephyr for Jira)

### 1.3 Jira Custom Workflow States
```
[ Backlog ] ──> [ To Do ] ──> [ In Progress ] ──> [ Code Review ] ──> [ QA Testing ] ──> [ Done ]
                                                                             │
                                                                             └── (On Defect) ──> [ Re-opened ]
```

---

## 2. Requirements Traceability Matrix (RTM)

| Requirement ID | Persona | Jira User Story Key | Summary | Jira Test Case Key | Test Type |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **US01** | Elderly User (Mr. Perera) | `CLASP-10` | Request assistance or companionship easily | `CLASP-TC-01`, `CLASP-TC-02` | Functional / UI Accessibility |
| **US02** | Volunteer (Nimali) | `CLASP-20` | Browse & accept micro-volunteering tasks | `CLASP-TC-03`, `CLASP-TC-04` | Functional / Gamification |
| **US03** | Caregiver (Thilini) | `CLASP-30` | Link relative & monitor activity in real time | `CLASP-TC-05`, `CLASP-TC-06` | Integration / Live Feed |
| **US04** | Administrator (Admin) | `CLASP-40` | Verify volunteers & moderate safety complaints | `CLASP-TC-07`, `CLASP-TC-08` | Security / Admin Control |

---

## 3. Detailed Jira Test Specifications (Xray / Zephyr Format)

### Test Case 1: `CLASP-TC-01` - Elderly Request Creation Workflow
* **Story Key**: `CLASP-10` (US01)
* **Summary**: Verify Mr. Perera can create a grocery & medication help request with date, time, and location.
* **Pre-conditions**: App logged in with Elderly persona (`elderly@claspconnect.lk`).
* **Test Data**: Activity: "Grocery & Medication Help", Date: "2026-08-25", Time: "10:30 AM", Location: "Colombo 03".
* **Execution Steps**:
  1. Open ClaspConnect App and ensure Elderly Dashboard is visible.
  2. Tap the large "Request Help or Companionship" button.
  3. Select "Grocery & Medication Help" activity card.
  4. Fill in Date ("2026-08-25"), Time ("10:30 AM"), and Location ("Colombo 03").
  5. Tap "Submit Request Now".
* **Expected Result**: Request is successfully saved to Firestore, confirmation modal is displayed, and status is set to `Pending`.

---

### Test Case 2: `CLASP-TC-03` - Volunteer Browse & Accept Opportunity
* **Story Key**: `CLASP-20` (US02)
* **Summary**: Verify Nimali can view pending requests and accept an opportunity.
* **Pre-conditions**: Volunteer account logged in (`volunteer@claspconnect.lk`) with `verified: true`.
* **Execution Steps**:
  1. Open Volunteer Dashboard.
  2. Tap "Browse Opportunities".
  3. Locate Mr. Perera's pending request.
  4. Tap "Accept Opportunity".
  5. Confirm acceptance dialog.
* **Expected Result**: Request status in Firestore updates from `Pending` to `Matched`, volunteer ID is attached, and task appears under Volunteer's "My Commitments".

---

### Test Case 3: `CLASP-TC-04` - Volunteer Visit Check-in & Check-out Lifecycle
* **Story Key**: `CLASP-20` (US02)
* **Summary**: Verify Volunteer check-in starts visit and check-out awards +20 Reward Points.
* **Pre-conditions**: Matched task exists under Volunteer commitments.
* **Execution Steps**:
  1. Navigate to "My Commitments".
  2. Tap "Check-in / Start Visit". Observe status updates to `In Progress`.
  3. Tap "Check-out & Mark Visit Completed".
* **Expected Result**: Status updates to `Completed`, visit timestamp recorded, and volunteer points increase by +20 (from 140 to 160).

---

### Test Case 4: `CLASP-TC-05` - Caregiver Elderly Linking & Live Monitor
* **Story Key**: `CLASP-30` (US03)
* **Summary**: Verify Thilini can link Mr. Perera using code `PERERA-72` and view live visit updates.
* **Pre-conditions**: Caregiver persona active (`caregiver@claspconnect.lk`).
* **Execution Steps**:
  1. Tap "Link Another Elderly Relative".
  2. Input code `PERERA-72` and tap "Connect Account".
  3. Return to Caregiver Dashboard and tap "Live Activity Monitor".
* **Expected Result**: Mr. Perera's account is linked, and real-time visit status (`Matched`, `Completed`, volunteer details) is displayed.

---

### Test Case 5: `CLASP-TC-07` - Admin Volunteer Identity Verification
* **Story Key**: `CLASP-40` (US04)
* **Summary**: Verify System Admin can review uploaded NIC document and issue verified status badge.
* **Pre-conditions**: Admin persona active (`admin@claspconnect.lk`).
* **Execution Steps**:
  1. Open Admin Dashboard.
  2. Tap "Verify Volunteer IDs".
  3. Locate pending applicant (Kavinda Bandara).
  4. Tap "Approve & Verify Badge".
* **Expected Result**: Volunteer `verified` field updates to `true` in Firestore, and verified green checkmark badge appears on volunteer profile.

---

## 4. Defect Reporting Template for Jira

When a bug is found during testing, log it in Jira with the following structure:

```markdown
Issue Type: Bug
Summary: [Module] Short description of defect
Component: Frontend / Firebase Firestore / Navigation
Severity: High / Medium / Low
Environment: Windows / Expo Go / Android / iOS / Web

Description:
Steps to Reproduce:
1. ...
2. ...

Expected Behavior:
Actual Behavior:

Screenshots / Logs:
[Attach screenshot or log output]
```

---

## 5. Automated Verification Commands

Run the following commands in terminal to verify codebase integrity:
```powershell
# 1. Start Expo dev server
npx expo start

# 2. Check for typescript / dependency health
npx expo doctor
```
