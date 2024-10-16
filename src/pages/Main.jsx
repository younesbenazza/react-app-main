import AccountDetails from "../components/AccountDetails";
import Card from "../components/Card";
import SchoolYearManager from "../components/SchoolYearMnager";

function Main({ bookLength, memberLength, loanLength, archiveLength }) {
  return (
    <div className="mx-4 my-4 font-custom ">
      
      <div className="">
        <h1 className="text-right font-semibold text-lg p-4 mx-6 ">
          إحصائيات عامة
        </h1>
        <div className="grid grid-cols-2 lg:grid-cols-4 my-4 gap-3">
          <Card
            title={"عدد الكتب"}
            number={bookLength}
            icon={"/static/build/icons/books.png"}
            type={["كتب", "كتاب"]}
          />
          <Card
            title={"عدد التلاميذ"}
            number={memberLength}
            icon={"/static/build/icons/person.png"}
            type={["تلاميذ", "تلميذ"]}
          />
          <Card
            title={"عدد الإعارات"}
            number={loanLength}
            icon={"/static/build/icons/loan.png"}
            type={["إعارات", "إعارة"]}
          />
          <Card
            title={"عدد الملفات"}
            number={archiveLength}
            icon={"/static/build/icons/archive.png"}
            type={["ملفات", "ملف"]}
          />
        </div>
        <SchoolYearManager />
      </div>
    </div>
  );
}

export default Main;
