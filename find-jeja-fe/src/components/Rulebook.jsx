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
            각 조는 앱에 로그인할 수 있는 <strong>초기 비밀번호</strong>를 맞춰야 합니다.
          </Typography>
          <Typography variant="body2" gutterBottom>
            - <strong>비밀번호는 각 조 조원 전체의 생년월일 6자리(YYMMDD)를 모두 합한 숫자</strong>입니다. (이름표 뒤에 있는 모든 조원의 생년월일의 합으로 진행)
          </Typography>
          <Typography variant="body2">
            - 비밀번호를 맞추면 자동으로 앱 내에서 여러분 조만 알 수 있는 <strong>새로운 비밀번호를 설정</strong>하게 됩니다. 이 비밀번호를 잊지 마세요!
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
            물총으로부터 등에 붙인 <strong>이름표를 지키면서, 다른 조 대표의 이름표를 물총으로 맞춰 번지게 하세요!</strong>
          </Typography>
          <Typography variant="body2" gutterBottom>
            - <strong>이름표 준비:</strong> 각 조는 <strong>다양한 크기의 이름표</strong>를 받게 됩니다. 조원들끼리 서로 논의하여 이름표를 등에 적절히 분배하고 부착해 주세요.
          </Typography>
          <Typography variant="body2" gutterBottom>
            - <strong>조 대표 선정:</strong> 각 조는 <strong>대표 한 명을 임의로 선정</strong>해야 합니다. 대표의 이름표 뒤에는 <strong>대표임을 확인할 수 있는 특별한 표시</strong>가 부착됩니다.
          </Typography>
          <Typography variant="body2" gutterBottom>
            - <strong>목표:</strong> 물총으로 다른 조 <strong>대표의 이름표를 맞춰 번지게 하는 것</strong>입니다. 성공하면 힌트를 얻고, 동시에 상대 조를 탈락시킬 수 있습니다.
          </Typography>
          <Typography variant="body2" gutterBottom>
            - <strong>주요 룰</strong>: 이름표가 번진 것이 확인되면 즉시 이름표를 떼서 <strong>상대 팀에게 넘겨주세요.</strong>
          </Typography>
          <Typography variant="body2" sx={{}} gutterBottom>
            - <strong>대표 명중 시:</strong>
          </Typography>
          <Typography variant="body2" sx={{ ml: 2 }} gutterBottom>
            - 맞은 조는 <strong>팀원 전체가 즉시 게임에서 아웃됩니다.</strong> 더 이상 힌트를 얻을 수 없으며, 현재까지 획득한 힌트로만 정답을 맞춰야 합니다.
          </Typography>
          <Typography variant="body2" sx={{ ml: 2 }} gutterBottom>
            - 맞춘 조는 맞은 대표의 이름표를 떼서 진행자에게 가져오면 <strong>힌트 레벨이 2단계 상승</strong>합니다.
          </Typography>
          <Typography variant="body2" sx={{}} gutterBottom>
            - <strong>일반 조원 명중 시:</strong>
          </Typography>
          <Typography variant="body2" sx={{ ml: 2 }} gutterBottom>
            - 맞은 조원은 바로 <strong>감옥 공간으로 이동</strong>합니다. 감옥에 있더라도 제자 추리에는 계속 참여할 수 있습니다.
          </Typography>
          <Typography variant="body2" sx={{ ml: 2 }} gutterBottom>
            - 맞춘 조는 맞은 사람의 이름표를 떼서 진행자에게 가져오면 <strong>힌트 레벨이 1단계 상승</strong>합니다.
          </Typography>
          <Typography variant="body2" gutterBottom>
            <strong>※주의사항※</strong> 만약 본인 조의 이름표가 번졌음에도 불구하고 이를 속이거나 눈 감아준 사실이 발각될 경우, 해당 조는 <strong>즉시 탈락 처리</strong>됩니다. 공정하게 판단해 주시길 부탁드립니다!
          </Typography>
          <Typography variant="body2">
            <strong>- 물총 사용:</strong> 물총은 <strong>17시 정각</strong>, <strong>힌트를 1개 이상 찾은 조에게 1개씩만 지급</strong>됩니다. 각 조원 중 한 명이 직접 진행자에게 와서 물총을 받아 가야 합니다. 물총은 받는 즉시 사용 가능합니다.
          </Typography>
        </AccordionDetails>
      </Accordion>

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
            힌트 레벨은 다음 두 가지 방법으로 올릴 수 있습니다.
          </Typography>
          <Typography variant="body2" gutterBottom>
            - <strong>물총 힌트:</strong> 물총으로 상대 조의 이름표를 맞춰 번지게 한 후, 번진 이름표를 진행자에게 가져오면 <strong>힌트 레벨을 한 단계 올릴 수 있습니다.</strong>
          </Typography>
          <Typography variant="body2">
            - <strong>보물찾기 힌트:</strong> 미리 숨겨진 쪽지를 찾아 진행자에게 가져오면 힌트가 공개됩니다. <strong>각 팀당 최대 3개까지</strong> 찾을 수 있으며, 찾을 때마다 <strong>힌트 레벨이 올라갑니다.</strong>
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
            각 조의 페이지를 통해 추리한 제자 이름을 입력하여 <strong>정답을 맞출 수 있습니다.</strong> 정답 기회는 <strong>총 3번</strong> 주어지니 신중하게 입력하세요!
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
            최종 등수는 <strong>맞춘 시간</strong>과 <strong>남은 정답 기회</strong>로 결정되며 미션 종료 후 발표될 예정입니다.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
}

export default Rulebook;
