import { Fragment, ReactNode } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/header";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type Crumb = {
  label: string;
  to?: string;
};

interface PageHeaderProps {
  breadcrumbs: Crumb[];
  title: string;
  titleExtra?: ReactNode;
  description?: string;
  actions?: ReactNode;
}

const PageHeader = ({
  breadcrumbs,
  title,
  titleExtra,
  description,
  actions,
}: PageHeaderProps) => {
  return (
    <>
      <Header>
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((crumb, index) => (
              <Fragment key={`${crumb.label}-${index}`}>
                {index > 0 && <BreadcrumbSeparator />}
                <BreadcrumbItem>
                  {crumb.to ? (
                    <BreadcrumbLink asChild>
                      <Link to={crumb.to}>{crumb.label}</Link>
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
              </Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </Header>
      <div className="flex flex-wrap items-end justify-between gap-4 px-4 pt-4 lg:px-6 lg:pt-6">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
            {titleExtra}
          </div>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
        {actions && (
          <div className="flex shrink-0 items-center gap-2">{actions}</div>
        )}
      </div>
    </>
  );
};

export default PageHeader;
