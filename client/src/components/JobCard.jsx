import { useState } from "react";

const JobCard = ({ job, onApply }) => {
  return (
    <div className="border border-gray-200 p-6 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow">
      <h2 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h2>
      <p className="text-gray-700 mb-3">
        <span className="font-semibold">{job.company}</span>
        {job.location && <span className="text-gray-500"> • {job.location}</span>}
      </p>
      
      {(job.experience || job.education) && (
        <div className="flex flex-wrap gap-3 mb-3 text-sm text-gray-600">
          {job.experience && (
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {job.experience}
            </span>
          )}
          {job.education && (
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              {job.education}
            </span>
          )}
        </div>
      )}
      
      {job.skills && job.skills.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {job.skills.map((skill, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full border border-emerald-200"
            >
              {skill}
            </span>
          ))}
        </div>
      )}
      
      <div className="flex items-center justify-between pt-3 border-t">
        {job.createdAt && (
          <p className="text-xs text-gray-500">
            Posted {new Date(job.createdAt).toLocaleDateString()}
          </p>
        )}
        <button
          onClick={() => onApply?.(job)}
          className="rounded bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-2 text-sm font-semibold text-white hover:from-emerald-600 hover:to-teal-700"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobCard;
