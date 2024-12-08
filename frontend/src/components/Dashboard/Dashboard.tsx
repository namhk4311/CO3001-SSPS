import React, { useState } from 'react';
import './Dashboard.css';
import PrintDialog from '../Print/Print';
import PrinterSelectionDialog from '../Print2/Print2';
import PrintConfirmationDialog from '../Print3/Print3';
import AddPageNumber from '../AddPageNumber/AddPageNumber';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'



interface IDOCUMENT {
  Name: string,
  pages: number,
  End_time: string,
  time: string,
  Format: string,
  Number_of_pages: number
}



interface Printer {
  PrID: number,
  name: string;
  features: string[];
  location: string;
}

interface MetaInfo {
  Name: string,
  Number_of_pages: number,
  PrID: number,
  numCopies: number,
  printingColor: string,
  pageSide: string, 
  sizePage: string,
  layout: string,
  oddEven: string
}


interface DashboardProps {
  // onLogout: () => void;
}


// interface HeaderProps {
//   onOpenPrintDialog: () => void;
//   onLogout: () => void;
// }

interface HeaderProps {
  onOpenPrintDialog: () => void;
  onLogout: () => void;
  onOpenAddPageDialog: () => void;
}

interface CurrentPrintOrderProps {
  onCreatePrintOrder: () => void;
  isPrinting: boolean;          
  loadingProgress: number;    
  totalPages: number;
}

interface RecentPrintsProps {
  fetchDocument: IDOCUMENT[];
  setFetchDocument: React.Dispatch<React.SetStateAction<IDOCUMENT[]>>;
}


const Header: React.FC<HeaderProps> = ({ onOpenPrintDialog, onLogout, onOpenAddPageDialog }) => {
  return (
    <header className="header">

      <nav className="nav">
        <a href="#" className="nav-link active">Trang chủ</a>
        <a href="#" className="nav-link" onClick={onOpenPrintDialog}>In tài liệu</a>
        <a href="#" className="nav-link" onClick={onOpenAddPageDialog} >Thêm số trang</a>
        <a href="#" className="nav-link" onClick={(e) => {
          e.preventDefault();
          const footer = document.getElementById('footer');
          if (footer) {
            footer.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        >Hỗ trợ</a>
      </nav>
      <div className="profile">
            <img src="/image/user.png" alt="Profile" />
            <a href="#" className="logout" onClick={(e) => 
            {
              e.preventDefault();
              onLogout();
            }}>
            Đăng xuất</a>
      </div>
      
    </header>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <img src="/image/bk.png" alt="Logo" width="80" height="80" />
          <span className="footer-logo-text">HCMUT Student Smart Printing Service</span>
        </div>
        <div className="footer-info">
          <div className="footer-section">
            <h4>Website</h4>
            <p>HCMUT</p>
            <p>BKPay</p>
          </div>
          <div className="footer-section">
            <h4>Liên hệ</h4>
            <p>268 Lý Thường Kiệt, P.14, Q.10, TP.HCM</p>
            <p>ssp@hcmut.edu.vn</p>
          </div>
        </div>
      </div>
    </footer>
  );
};


const RecentPrints: React.FC<RecentPrintsProps> = ({fetchDocument, setFetchDocument}) => {
  
  const {ID} = JSON.parse(localStorage.getItem("myid") || '');

  React.useEffect(() => {
    axios.get(`http://localhost:8081/api/print/document/${ID}`).then(
      res => {
        if (res.data) setFetchDocument(res.data);
      }
    ).catch(err => {console.log(err)});
    console.log(fetchDocument);
  }, []);
  var documents = fetchDocument.map((document) => {
    return {name: `${document.Name}.${document.Format}`, pages: document.Number_of_pages, date: document.End_time}
  }).reverse();
  // [
  //   { name: 'Document_A.docx', pages: 12, time: '15:00 PM', date: '22/10/2023' },
  //   { name: 'Document_A.docx', pages: 12, time: '15:00 PM', date: '22/10/2023' },
  //   { name: 'Document_A.docx', pages: 12, time: '15:00 PM', date: '22/10/2023' },
  //   { name: 'Document_A.docx', pages: 12, time: '15:00 PM', date: '22/10/2023' },
  // ];

  return (
    // <div className={`recent-prints ${!isMenuOpen ? "narrow" : ""}`}>
    <div className="recent-prints">
      <div className="recentheader">
        <h2>Đã in gần đây</h2>
        <a href="#">Xem tất cả</a>
      </div>
      <ul>
        {documents.map((doc, index) => (
          <li key={index} className="document-item">
            <img src="/image/document.svg" alt="Document Icon" className="document-icon" />
            <div className="document-info">
              <span className="document-name">{doc.name}</span>
              <span className="document-details">Số trang: {doc.pages} trang • Thời gian in: {doc.date}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const CurrentPrintOrder: React.FC<CurrentPrintOrderProps> = ({ onCreatePrintOrder, isPrinting, loadingProgress, totalPages }) => {
  return (
    <div className="current-print-order">
      <h2>Lệnh in hiện tại</h2>
      <div className="print-order-status">
        {isPrinting ? (
          <>
            <p>Đang in <strong>{totalPages}</strong> trang...</p>
            <div className="loading-bar">
              <div className="progress" style={{ width: `${loadingProgress}%` }}></div>
            </div>
          </>
        ) : (
          <>
            <p>Không có gì đang được in</p>
            <a href="#" onClick={(e) => {
              e.preventDefault();
              onCreatePrintOrder();
            }}>
              Tạo lệnh in
            </a>
          </>
        )}
      </div>
    </div>
  );
};


const Calendar: React.FC = () => {
  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <span className="calendar-title">Lịch sử in</span>
        <span className="calendar-date">10/2024 ▼</span>
      </div>
      <div className="calendar-grid">
        {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map((day, index) => (
          <div key={index} className="calendar-day-name">{day}</div>
        ))}
        {[...Array(31)].map((_, index) => (
          <div key={index} className={`calendar-day ${getDayClass(index + 1)}`}>{index + 1}</div>
        ))}
      </div>
    </div>
  );
};

const getDayClass = (day: number): string => {
  switch (day) {
    case 2:
      return 'highlight-yellow';
    case 16:
    case 17:
      return 'highlight-green';
    case 20:
      return 'highlight-purple';
    default:
      return '';
  }
};




const Dashboard: React.FC<DashboardProps> = () => {

  const [fetchDocument, setFetchDocument] = useState<IDOCUMENT[]>([{Name: '', pages: 0, End_time: '', time: '', Format: '', Number_of_pages: 0}]);

  const [currentDialog, setCurrentDialog] = useState<'none' | 'print' | 'printer-selection' | 'print-confirmation' | 'add-page-number'>('none');

  const handleOpenAddPageNumberDialog = () => {
    setCurrentDialog('add-page-number');
  };

  const [selectedPrinter, setSelectedPrinter] = useState<Printer | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0); // Manage total pages state
  const [isPrinting, setIsPrinting] = useState<boolean>(false);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);

  const [showAvailablePages, setShowAvailablePages] = useState(0);
  const [showTotalOrder, setShowTotalOrder] = useState(0);
  const [showTotalPage, setShowTotalPage] = useState(0);


  const [metafile, setMetafile] = useState<MetaInfo>(
    {
      Name: '',
      Number_of_pages: 0,
      PrID: 0,
      numCopies: 0,
      printingColor: '',
      pageSide: '', 
      sizePage: '',
      layout: '',
      oddEven: ''
    }
  );


  /*logout handle function */
  const navigate = useNavigate();

  const handleLogout = () => {
    axios.get('http://localhost:8081/api/user/logout')
        .then(res => {
            if (res.data.Status === "Success") {
              navigate('/');
            }
            else {
                alert("error");
            }
    }).catch(err => console.log(err))
  };
  const {ID} = JSON.parse(localStorage.getItem("myid") || '');
  
  React.useEffect(() => {
    axios.get(`http://localhost:8081/api/student/balance/${ID}`).then(
      res => {
        if (res.data) {
          setShowAvailablePages(res.data.Available_Pages);
        }
      }
    );

    axios.get(`http://localhost:8081/api/print/order/${ID}`). then(
      res => {
        if (res.data) {
          setShowTotalOrder(res.data.totalOrder);
        }
      }
    );

    axios.get(`http://localhost:8081/api/print/totalpage/${ID}`).then(
      res => {
        if (res.data && res.data.TotalPagesPrinted) {
          setShowTotalPage(res.data.TotalPagesPrinted);
        }
      }
    )
  }, []);

  const handleOpenPrintDialog = () => {
    setCurrentDialog('print');
  };

  const handleCloseDialog = () => {
    setCurrentDialog('none');
  };

  const handleContinueToPrinterSelection = () => {
    setCurrentDialog('printer-selection');
  };

  const handleBackToPrintDialog = () => {
    setCurrentDialog('print');
  };

  const handleContinueToPrintConfirmation = () => {
    setCurrentDialog('print-confirmation');
  };

  const handleSelectPrinter = (printer: Printer) => {
    setSelectedPrinter(printer);
    setCurrentDialog('print-confirmation');
  };

  const handleBackToPrinterSelection = () => {
    setCurrentDialog('printer-selection');
  };

  // Function to start the printing process
  const handleStartPrinting = (pages: number) => {
      if (pages === 0) {
        alert('Không có trang nào để in!');
        return;
      }
  
      setIsPrinting(true);
      setLoadingProgress(0);
      setTotalPages(pages);
      
      // Simulate printing progress for each page (1 second per page)
      let progress = 0;
      const interval = setInterval(() => {
        progress += 100 / pages;
        setLoadingProgress(progress);
  
        if (progress >= 100) {
          clearInterval(interval);
          setIsPrinting(false);
          alert("In thành công!");
          window.location.reload();
          setTotalPages(0);
        }
      }, 1000); // Update progress every second (1 second per page)
    
    
  };

  return (
    <div className="dashboard">
      <Header onOpenPrintDialog={handleOpenPrintDialog} onLogout={handleLogout} onOpenAddPageDialog={handleOpenAddPageNumberDialog} />
      <div className="main-content">
        <div className="left-menu">
          <div className="stats">
            <div className="stat-item">
              <span>Số dư còn lại: </span>
              <span>{showAvailablePages}</span>
            </div>
            <div className="stat-item">
              <span>Số lệnh in: </span>
              <span>{showTotalOrder}</span>
            </div>
            <div className="stat-item">
              <span>Số tờ giấy đã in: </span>
              <span>{showTotalPage}</span>
            </div>
          </div>
        </div>

        <div className="content">
          <div className="welcome">
            <h1>Ho Chi Minh City University Of Technology</h1>
            <h2>Student Smart Printing Service</h2>
          </div>
          <RecentPrints fetchDocument={fetchDocument} setFetchDocument={setFetchDocument} />
        </div>

        {/* RIGHT MENU */}
        <div className="right-menu">
          <CurrentPrintOrder 
            onCreatePrintOrder={handleOpenPrintDialog} 
            isPrinting={isPrinting} 
            loadingProgress={loadingProgress} 
            totalPages={totalPages} // Pass totalPages to CurrentPrintOrder
          />
          <Calendar />
        </div>
      </div>

      <Footer />

      {currentDialog === 'print' && (
        <PrintDialog onClose={handleCloseDialog} onContinue={handleContinueToPrinterSelection} setMetafile={setMetafile} />
      )}
      {currentDialog === 'printer-selection' && (
        <PrinterSelectionDialog
          onBack={handleBackToPrintDialog}
          onClose={handleCloseDialog}
          onContinue={handleContinueToPrintConfirmation}
          onSelectPrinter={handleSelectPrinter}
          metafile={metafile}
          setMetafile={setMetafile}
        />
      )}
      {currentDialog === 'print-confirmation' && (
        <PrintConfirmationDialog
          selectedPrinter={selectedPrinter}
          totalPages={totalPages} 
          onBack={handleBackToPrinterSelection}
          onClose={handleCloseDialog}
          onChangePrinter={handleBackToPrinterSelection}
          onStartPrinting={handleStartPrinting}
          metafile={metafile}
          setMetafile={setMetafile}
          setFetchDocument={setFetchDocument}
        />
      )}
    {currentDialog === 'add-page-number' && (
      <AddPageNumber
        onClose={handleCloseDialog}
        onSubmit={handleOpenAddPageNumberDialog}
      />
    )}
    </div>
  );
};

export default Dashboard;

