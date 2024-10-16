import React from "react";
import PlanSummaryCard from "../components/StatsCard";

const Statistics = ({ books, members, archives, loans, cards }) => {
  const rentedBooks = books.filter((book) => book.statu === "rented").length;
  const lostBooks = books.filter((book) => book.statu === "lost").length;
  const availableBooks = books.filter(
    (book) => book.statu === "available"
  ).length;
  const returnedBooks = loans.filter((loan) => loan.isReturned).length;
  const totalCategories = Array.from(
    new Set(books.map((book) => book.category))
  ).length;
  var daysLeft;
  const DelayedLoans = loans.filter((loan) => {
    daysLeft = Math.max(
      Math.floor(
        (new Date(loan.return_date) - new Date()) / (1000 * 60 * 60 * 24)
      ),
      0
    );

    return loan ? daysLeft === 0 && loan.isReturned === false : null;
  }).length;
  const ActiveLoans = loans.filter((loan) => {
    return loan ? loan.isReturned === false : null;
  }).length;
  const borrowedStudents = loans
    .map((loan) => loan.student_id)
    .filter((value, index, self) => self.indexOf(value) === index).length;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 p-12">
        <PlanSummaryCard
          title="عدد الكتب"
          title2="الكتب المتاحة"
          usedValue={availableBooks}
          maxValue={books.length}
          icon="/static/build/icons/stats/books.png"
          color="text-green-500"
        />
        <PlanSummaryCard
          title="عدد الكتب"
          title2="الكتب المستعارة"
          usedValue={rentedBooks}
          maxValue={books.length}
          icon="/static/build/icons/stats/Borrowed.png"
          color="text-purple-500"
        />
        <PlanSummaryCard
          title="عدد الكتب"
          title2="الكتب الضائعة"
          usedValue={lostBooks}
          maxValue={books.length}
          icon="/static/build/icons/stats/Lost.png"
          color="text-red-500"
        />

        <PlanSummaryCard
          title="عدد التلاميذ"
          title2="بطاقات المكتبة"
          usedValue={cards.length}
          maxValue={members.length}
          icon="/static/build/icons/stats/cards.png"
          color="text-indigo-500"
        />
        <PlanSummaryCard
          title="عدد الإعارات"
          title2="الإعارات المنجزة"
          usedValue={returnedBooks}
          maxValue={loans.length}
          icon="/static/build/icons/stats/Done.png"
          color="text-green-500"
        />
        <PlanSummaryCard
          title="عدد الإعارات"
          title2="الإعارات النشطة"
          usedValue={ActiveLoans}
          maxValue={loans.length}
          icon="/static/build/icons/stats/Active.png"
          color="text-purple-500"
        />
        <PlanSummaryCard
          title="عدد الإعارات"
          title2="الإعارات المتأخرة"
          usedValue={DelayedLoans}
          maxValue={loans.length}
          icon="/static/build/icons/stats/Delayed.png"
          color="text-red-500"
        />
        <PlanSummaryCard
          title="عدد التلاميذ"
          title2="التلاميذ المستعيرين"
          usedValue={borrowedStudents}
          maxValue={members.length}
          icon="/static/build/icons/stats/studentWloan.png"
          color="text-indigo-500"
        />
      </div>
    </>
  );
};

export default Statistics;
