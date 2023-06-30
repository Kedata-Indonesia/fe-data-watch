import Image from 'next/image';

const featureItems = [
  {
    id: '1',
    title: 'Data Source Integration',
    content:
      'Seamlessly upload or connect to various data sources, including databases, cloud storage, or APIs. Easily import your data for analysis and data quality assessment.',
  },
  {
    id: '2',
    title: 'Auto Data Exploration',
    content:
      'Gain valuable insights into your data through automated data exploration. Our tool examines your dataset, identifies patterns, detects outliers, and provides a comprehensive overview of your data.',
  },
  {
    id: '3',
    title: 'Rule Creation',
    content:
      'Create custom data quality rules tailored to your specific requirements. Define rules to validate, clean, and standardize your data, ensuring consistency and accuracy across your datasets.',
  },
  {
    id: '4',
    title: 'Data Quality Reports',
    content:
      'Generate detailed data quality reports that provide in-depth analysis of your data. Identify data issues, anomalies, and potential errors, enabling you to take proactive steps towards improving data quality.',
  },
  {
    id: '5',
    title: 'Prepocessing Suggestions',
    content:
      'Receive intelligent suggestions and recommendations for data preprocessing based on the analysis of your dataset. Optimize your data preparation process and enhance the quality of your data.',
  },
  {
    id: '6',
    title: 'Download Reports',
    content:
      'Download data quality reports in various formats, such as PDF or Excel, for easy sharing and offline access. Share the reports with your team or stakeholders to facilitate collaboration and decision-making.',
  },
];

const FeatureList = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 product-features">
    {featureItems.map((item) => (
      <div key={item.id} className="py-[20px] md:p-[32px]">
        <div className="flex flex-col gap-y-2 md:gap-y-0">
          <div className="flex flex-row md:flex-col items-center gap-x-2">
            <div className="w-full lg:h-[84px] max-w-[84px] relative">
              <Image
                alt={`feature-${item.id}`}
                src={`/images/feature-${item.id}.png`}
                style={{ objectFit: 'contain' }}
                fill
              />
            </div>
            <h3 className="text-[16px] font-bold lg:mt-[24px] lg:mb-[8px] font-archivo">
              {item.title}
            </h3>
          </div>
          <p className="text-left md:text-center md:text-base text-[10px]">
            {item.content}
          </p>
        </div>
      </div>
    ))}
  </div>
);
export default FeatureList;
