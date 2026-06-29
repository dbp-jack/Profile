import type { ProjectData } from './types'

export const fixTicketingProject: ProjectData = {
  id: 'fix-ticketing',
  name: 'FIX - B2C | 야구 티켓팅 플랫폼',
  period: '2025.04 – 2025.05',
  teamSize: '4명 / 팀 프로젝트',
  description:
    '경기 조회부터 좌석 예약·주문·결제·알림까지 연결한 MSA 기반 야구 티켓팅 플랫폼',
  summary: {
    problem: '주문과 결제를 동기 호출로 묶으면 결제 지연·실패가 주문 요청과 상태 정합성에 직접 전파됩니다.',
    action: 'Kafka 이벤트로 주문·결제 계약을 분리하고 성공·실패·취소 이벤트와 보상 흐름을 구현했습니다.',
    result: '주문 상태 전이 책임을 이벤트 타입으로 명확히 하고, 결제 실패·취소 시 주문 취소 흐름까지 연결했습니다.',
  },
  overviewSummary: {
    intro: '좌석 예약부터 주문·결제까지 이어지는 MSA 티켓팅에서 주문·결제 이벤트 흐름을 담당했습니다.',
    achievement: 'Kafka 이벤트로 주문 요청과 결제 처리를 분리하고, 결제 실패·취소 시 주문 취소로 이어지는 보상 흐름을 구현했습니다.',
    reflection: '이벤트 설계는 성공 흐름보다 실패 이후 책임과 상태 전이를 먼저 정해야 한다는 회고로 이어졌습니다.',
  },
  serviceOverview:
    '경기와 좌석을 조회하고 티켓을 예약한 뒤 주문·결제까지 이어지는 <span class="font-bold">야구 티켓팅 플랫폼</span>입니다.\n주문과 결제를 서로 다른 서비스로 분리한 환경에서, 한 서비스의 실패가 동기 호출 체인을 따라 확산되지 않도록 Kafka 이벤트 기반 처리 흐름을 구현했습니다.',
  developerPerspective:
    '주문 생성 이후 결제 성공·실패·취소가 모두 주문 상태에 반영돼야 했습니다. 동기 호출로 연결하면 결제 지연이나 장애가 주문 요청까지 전파되고, 중간 실패 시 어느 서비스가 상태를 되돌릴지 모호해집니다.\n그래서 주문·결제 간 계약을 이벤트로 분리하고, <span class="font-semibold text-[#2563EB] dark:text-[#8aa8e8]">결제 결과에 따라 주문 완료 또는 취소 이벤트가 이어지는 Choreography 흐름</span>을 설계했습니다.',
  techStack: ['Spring Boot 3.4.3', 'Kafka', 'PostgreSQL', 'Redis', 'Docker', 'AWS', 'Toss Payments'],
  roles: [
    {
      icon: '🧾',
      title: '주문 도메인 구현',
      detail: '주문 생성·조회·수정·취소와 QueryDSL 검색, 주문 상세 Redis 캐시 구현',
    },
    {
      icon: '💳',
      title: '결제 모듈 및 연동',
      detail: 'Toss Payments 결제 승인·실패 기록·환불 흐름과 주문 상태 연동 구현',
    },
    {
      icon: '📨',
      title: 'Kafka 이벤트 흐름',
      detail: '주문·결제 Producer/Consumer와 공통 이벤트 메시지 계약, 결제 실패·취소 보상 흐름 구현',
    },
  ],
  problemHeadline: '주문·결제 서비스 간 장애 전파와 상태 불일치 문제',
  problem:
    '주문 생성 뒤 결제 결과를 동기 호출로만 연결하면 결제 서비스의 지연·실패가 주문 요청에 직접 전파됩니다. 또한 결제 실패나 취소가 발생했을 때 주문 상태와 예약 티켓을 어떤 순서로 되돌릴지 서비스 간 책임이 모호했습니다.',
  thinking:
    '주문과 결제의 독립 배포 경계를 유지하면서 결과를 전달할 방법을 비교했습니다.<ul class="mt-3 space-y-2"><li><strong>동기 Feign 호출</strong> — 구현은 단순하지만 호출 지연과 장애가 연쇄됨</li><li><strong>중앙 Orchestrator</strong> — 흐름은 명확하지만 별도 조정 서비스와 단일 병목이 생김</li><li><strong>Kafka Choreography</strong> — 이벤트 계약과 중복 처리 관리가 필요하지만 서비스 결합도를 낮출 수 있어 선택</li></ul>',
  solution:
    '<div class="space-y-2"><p><strong>1.</strong> 주문 생성 시 <span class="font-mono font-semibold">ORDER_CREATED</span> 이벤트를 발행하고 결제 서비스가 이를 소비해 결제를 처리했습니다.</p><p><strong>2.</strong> 결제 결과를 <span class="font-mono font-semibold">PAYMENT_COMPLETED</span>·<span class="font-mono font-semibold">PAYMENT_COMPLETION_FAILED</span>·<span class="font-mono font-semibold">PAYMENT_CANCELLED</span>로 분리했습니다.</p><p><strong>3.</strong> 주문 서비스는 결과 이벤트를 소비해 완료 또는 취소 상태로 전환하고, 취소 이벤트를 후속 서비스가 이어서 처리할 수 있게 발행했습니다.</p><p><strong>4.</strong> 이벤트에는 orderId를 key로 사용하고 공통 메시지 포맷에 eventType과 payload를 담아 서비스 간 계약을 통일했습니다.</p></div>',
  result:
    '<ul class="space-y-2"><li>주문 요청이 결제 처리 완료를 직접 기다리지 않는 비동기 경계 구성</li><li>결제 성공·실패·취소 결과를 명시적인 이벤트 타입으로 분리해 상태 전이 책임을 코드에 드러냄</li><li>결제 실패·취소 시 주문 취소 이벤트가 이어지는 보상 흐름 구현</li><li>본인 커밋 기준 주문·결제 Producer/Consumer와 payload 계약 구현 근거 확인</li></ul>',
  projectReflection: {
    title: '이벤트 기반 전환은 실패 경로를 먼저 설계해야 했습니다',
    body:
      'Kafka 이벤트로 주문·결제 계약을 분리하면서 주문 요청이 결제 처리 지연을 직접 기다리지 않는 경계를 만들었습니다. 하지만 정상 결제 이벤트만 비동기로 바꾸는 것으로는 주문과 결제의 상태를 맞출 수 없었습니다.<br/>결제 실패·취소를 별도 이벤트로 구분하고 주문이 이를 소비해 취소 상태로 전환하도록 만들면서, 이벤트 설계의 핵심은 성공 흐름보다 실패 이후의 책임과 상태 전이를 명확히 하는 데 있다는 점을 배웠습니다.',
  },
  githubUrl: 'https://github.com/FINAL-SPARTA/SPARTA-FINAL-PROJECT',
  wikiUrl: 'https://github.com/FINAL-SPARTA/SPARTA-FINAL-PROJECT/wiki',
}
