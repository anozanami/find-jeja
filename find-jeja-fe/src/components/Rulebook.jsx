import React from 'react';
import { Container, Typography, Accordion, AccordionSummary, AccordionDetails, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function Rulebook() {
  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" component="h2" align="center" gutterBottom>
        룰북
      </Typography>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h6">1. 초기 비밀번호 맞추기 🔑</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" gutterBottom>
            각 조는 웹 페이지에 로그인할 수 있는 <strong>초기 비밀번호</strong>를 맞춰야 합니다.
          </Typography>
          <Typography variant="body2" gutterBottom>
            - <strong>비밀번호는 진행자가 준비한 PPT</strong>를 확인해주세요!
          </Typography>
          <Typography variant="body2">
            - 비밀번호를 맞추면 자동으로 앱 내에서 여러분 조만 알 수 있는 <strong>새로운 비밀번호를 설정</strong>하게 됩니다. 모든 조원은 해당 비밀번호로 각 조 힌트 페이지에 접속이 가능합니다.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography variant="h6">2. 물총 서바이벌 🔫</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" gutterBottom>
            물총으로부터 등에 붙인 <strong>이름표를 지키면서, 다른 조원의 이름표를 물총으로 맞춰 번지게 하세요!</strong>
          </Typography>
          <Typography variant="body2" gutterBottom>
            - <strong>이름표 준비:</strong> 각 조는 <strong>다양한 크기의 이름표</strong>를 받게 됩니다. 조원들끼리 서로 논의하여 이름표를 적절히 분배하고 등에 부착해 주세요.
          </Typography>
          <Typography variant="body2" gutterBottom>
            - <strong>조 제자 선정:</strong> 각 조는 <strong>제자 한 명을 임의로 선정</strong>해야 합니다. 제자의 이름표 뒤에는 <strong>'제자'라고 쓰여진 표시</strong>가 부착됩니다.
          </Typography>
          <Typography variant="body2" gutterBottom>
            - <strong>목표:</strong> 물총으로 다른 조 <strong>조원/제자의 이름표를 맞춰 번지게 하는 것</strong>입니다. 성공하면 힌트를 얻고, 동시에 상대 조원를 아웃시킬 수 있습니다.
          </Typography>
          <Typography variant="body2" gutterBottom>
            - <strong>한 번 공격한 조는 다시 공격하지 못합니다. 예시 : 1조가 5조 중의 한 명을 물총으로 맞췄다면 다시 5조를 공격하지 못 함</strong>
          </Typography>
          <Typography variant="body2" sx={{}} gutterBottom>
            - <strong>제자 명중 시:</strong>
          </Typography>
          <Typography variant="body2" sx={{ ml: 2 }} gutterBottom>
            - 물총에 맞은 조는 <strong>팀원 전체가 즉시 물총 게임에서 아웃되며 감옥 공간으로 이동합니다.</strong> 물총 게임을 통한 힌트를 얻을 수 없으며, 현재까지 획득한 힌트로만 정답을 맞춰야 합니다.
          </Typography>
          <Typography variant="body2" sx={{ ml: 2 }} gutterBottom>
            - 물총을 맞춘 조는 맞은 <strong>'제자의 이름표'</strong>를 떼서 진행자에게 가져오면 <strong>힌트 레벨이 1단계 상승</strong>합니다.
          </Typography>
          <Typography variant="body2" sx={{}} gutterBottom>
            - <strong>일반 조원 명중 시:</strong>
          </Typography>
          <Typography variant="body2" sx={{ ml: 2 }} gutterBottom>
            - 물총에 맞은 조원은 바로 <strong>감옥 공간으로 이동</strong>합니다. 감옥에 있더라도 제자 추리에는 계속 참여할 수 있습니다.
          </Typography>
          <Typography variant="body2" sx={{ ml: 2 }} gutterBottom>
            - 물총을 맞춘 조는 맞은 사람의 이름표를 떼서 총 2개의 이름표를 진행자에게 가져오면 <strong>힌트 레벨이 1단계 상승</strong>합니다.
          </Typography>
          <Typography variant="body2">
            <strong>- 물총 사용:</strong> 물총은 <strong>17시 정각</strong>, <strong>힌트를 1개 이상 찾은 조에게 지급</strong>됩니다. 각 조원 중 한 명이 직접 진행자에게 와서 물총을 받아 가야 합니다. 물총은 받는 즉시 사용 가능합니다.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography variant="h6">2. 이름표 서바이벌 </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" gutterBottom>
            등에 붙인 <strong>이름표가 떼어지지 않게 지키면서, 다른 조원의 이름표를 뜯으세요!</strong>
          </Typography>
          <Typography variant="body2" gutterBottom>
            - <strong>이름표 준비:</strong> 각 조는 <strong>다양한 크기의 이름표</strong>를 받게 됩니다. 조원들끼리 서로 논의하여 이름표를 적절히 분배하고 등에 부착해 주세요.
          </Typography>
          <Typography variant="body2" gutterBottom>
            - <strong>조 제자 선정:</strong> 각 조는 <strong>제자 한 명을 임의로 선정</strong>해야 합니다. 제자의 이름표 뒤에는 <strong>'제자'라고 쓰여진 표시</strong>가 부착됩니다.
          </Typography>
          <Typography variant="body2" gutterBottom>
            - <strong>목표:</strong> 다른 조 <strong>조원/제자의 이름표를 뜯는 것</strong> 입니다. 성공하면 힌트를 얻고, 동시에 상대 조원를 아웃시킬 수 있습니다.
          </Typography>
          <Typography variant="body2" gutterBottom>
            - <strong>한 번 공격한 조는 다시 공격하지 못합니다. 예시 : 1조가 5조 중의 한 명의 이름표를 뜯었다면 다시 5조를 공격하지 못 함</strong>
          </Typography>
          <Typography variant="body2" sx={{}} gutterBottom>
            - <strong>제자가 뜯겼을 때:</strong>
          </Typography>
          <Typography variant="body2" sx={{ ml: 2 }} gutterBottom>
            - 이름표가 뜯긴 조는 <strong>팀원 전체가 즉시 이름표 게임에서 아웃되며 감옥 공간으로 이동합니다.</strong> 이름표 게임을 통한 힌트를 얻을 수 없으며, 현재까지 획득한 힌트로만 정답을 맞춰야 합니다.
          </Typography>
          <Typography variant="body2" sx={{ ml: 2 }} gutterBottom>
            - 이름표를 뜯은 조는 맞은 <strong>'제자의 이름표'</strong>를 떼서 진행자에게 가져오면 <strong>힌트 레벨이 1단계 상승</strong>합니다.
          </Typography>
          <Typography variant="body2" sx={{}} gutterBottom>
            - <strong>일반 조원 명중 시:</strong>
          </Typography>
          <Typography variant="body2" sx={{ ml: 2 }} gutterBottom>
            - 이름표가 뜯긴 조원은 바로 <strong>감옥 공간으로 이동</strong>합니다. 감옥에 있더라도 제자 추리에는 계속 참여할 수 있습니다.
          </Typography>
          <Typography variant="body2" sx={{ ml: 2 }} gutterBottom>
            - 이름표를 뜯은 조는 뜯긴 사람의 이름표를 떼서 총 2개의 이름표를 진행자에게 가져오면 <strong>힌트 레벨이 1단계 상승</strong>합니다.
          </Typography>
          <Typography variant="body2">
            <strong>- 게임 시작:</strong> 게임 시작은 <strong>17시 정각</strong>에 시작됩니다.
          </Typography>
        </AccordionDetails>
      </Accordion> */}

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography variant="h6">3. 힌트 획득 방법 💡</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" gutterBottom>
            힌트 레벨은 총 5단계이며 다음 두 가지 방법으로 올릴 수 있습니다.
          </Typography>
          <Typography variant="body2" gutterBottom>
            - <strong>물총 힌트:</strong> 물총으로 상대 조의 이름표를 맞춰 번지게 한 후, 번진 이름표를 진행자에게 가져오면 <strong>힌트 레벨을 올릴 수 있습니다.</strong>
          </Typography>
          <Typography variant="body2">
            - <strong>보물찾기 힌트:</strong> 미리 숨겨진 쪽지를 찾아 진행자에게 가져오면 힌트가 공개됩니다. <strong>각 팀당 최대 3개까지</strong> 찾을 수 있으며, 찾을 때마다 <strong>힌트 레벨이 올라갑니다.</strong>
          </Typography>
          <Typography variant="body2">
            - <strong>조별 차등 지급:</strong> 인원이 적은 조에게는 추가 힌트가 부여됩니다.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4a-content"
          id="panel4a-header"
        >
          <Typography variant="h6">4. 정답 입력 방법 💡</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1">
            각 조의 힌트를 통해 추리한 성경 인물 이름을 선택하여 <strong>정답을 맞출 수 있습니다.</strong> 정답 기회는 <strong>총 3번</strong> 주어지고 기회를 모두 소모하면 정답 입력이 불가능하니 신중하게 입력하세요! 
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel5a-content"
          id="panel5a-header"
        >
          <Typography variant="h6">5. 등수 확인 🏆</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1">
            최종 등수는 <strong>맞춘 시간</strong>과 <strong>남은 정답 기회</strong>로 결정되며 미션 종료 후 발표될 예정입니다. <strong>정답 기회가 등수에 결정적인 역할</strong>을 하니 정답을 신중하게 입력해주세요!
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
}

export default Rulebook;
