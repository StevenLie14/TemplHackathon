import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import Typography from '../typography';
import { Button } from '@/components/ui/button';
import { LoanPost } from '@/lib/model/entity/loan-post';
import { LoanPostService } from '@/services/loan-post.service';
import { useGetLoanAssurance } from '@/hooks/loan-post/use-get-loan-assurance';
import { toast } from 'sonner';

type LoanDisplayProps = {
  loan: LoanPost;
};

const loanPostService = new LoanPostService();

const LoanDisplay: React.FC<LoanDisplayProps> = ({ loan }) => {

  const { assurance, imageUrl, getAssuranceLoading } = useGetLoanAssurance(loan.assuranceId);

  const onAccept = () => {
    return loanPostService.acceptPost(loan.loanId);
  };

  const onReject = () => {
    return loanPostService.rejectPost(loan.loanId);
  };

  const handleAccept = () => {
    toast.promise(onAccept(), {
      loading: 'Accepting loan post...', 
      success: (data) => {
        return `Loan post accepted successfully!`;
      },
      error: 'Failed to accept loan post',
    });
  };
  
  const handleReject = () => {
    toast.promise(onReject(), {
      loading: 'Rejecting loan post...', 
      success: (data) => {
        return `Loan post rejected successfully!`;
      },
      error: 'Failed to reject loan post',
    });
  };


  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>{loan.title}</CardTitle>
        <CardDescription>Loan ID: {loan.loanId}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="w-full h-fit rounded-lg overflow-hidden">
          <img
            src={imageUrl? imageUrl : "https://placehold.co/800x600/png"}
            alt={loan.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <Typography variant="subtitle1">Description</Typography>
          <Typography variant="body1">{loan.description}</Typography>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Typography variant="subtitle1">Goal</Typography>
            <Typography variant="body1">${loan.goal.toLocaleString()}</Typography>
          </div>

          <div>
            <Typography variant="subtitle1">Applied At</Typography>
            <Typography variant="body1">{loan.createdAt}</Typography>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Typography variant="subtitle1">Category</Typography>
            <Typography variant="body1">{loan.category}</Typography>
          </div>

          <div>
            <Typography variant="subtitle1">Loan Duration</Typography>
            <Typography variant="body1">{loan.loanDuration.toString()} days</Typography>
          </div>
        </div>

        <div>
          <Typography variant="subtitle1">Debtor</Typography>
          <Typography variant="body1">{loan.debtor.toString()}</Typography>
        </div>

        <div>
          <Typography variant="subtitle1">Assurance Type</Typography>
          <Typography variant="body1">{assurance?.assuranceType}</Typography>
        </div>

        <div className="flex gap-4">
          <Button onClick={handleAccept} variant="default">
            Accept
          </Button>
          <Button onClick={handleReject} variant="destructive">
            Reject
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoanDisplay;